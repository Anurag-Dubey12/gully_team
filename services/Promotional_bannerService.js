import { Promotional_Banner_model ,Banner,Package} from '../models/index.js';
import ImageUploader from '../helpers/ImageUploader.js';
import { DateTime } from "luxon";
const PromotionalbannerService = {
    async createBanner(data) {
        const userInfo = global.user;
        
          let imageUrl = "";
          if (data.banner_image) {
            imageUrl = await ImageUploader.Upload(
              data.banner_image,
              "Banner_Promotion",
            );
          }
          const startDate = DateTime.fromISO(data.startDate, { zone: 'utc' }).startOf('day').toJSDate();
          const endDate = DateTime.fromISO(data.endDate, { zone: 'utc' }).startOf('day').toJSDate();

          const bannerData =new Promotional_Banner_model( {
            banner_title: data.banner_title,
            banner_image: imageUrl,
            startDate: startDate,
            endDate: endDate,
            bannerlocationaddress:data.bannerlocationaddress,
            locationHistory: {
              point: {
                type: "Point",
                coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
              },
              selectLocation: data.selectLocation,
            },
            packageId: data.packageId,
            userId: userInfo.userId
          });
    
          const banner = await bannerData.save();
          return banner;
      },

      async getbanner(){
        const userinfo=global.user;
        const myBanner=await Promotional_Banner_model.find({
          userId:userinfo.userId
        },{
          bannerlocationHistory:0
        }).populate('packageId');
        return myBanner;
      },

      async getBannersWithinRadius(latitude, longitude, radiusKm = 25, desiredBannerCount = 5) {
        // Convert the radius from kilometers to radians
        const radiusInRadians = radiusKm / 6371;
        const today = new Date();

        try {
            // First, get promotional banners within radius
            const promotionalBanners = await Promotional_Banner_model.find({
                "locationHistory.point": {
                    $geoWithin: {
                        $centerSphere: [[longitude, latitude], radiusInRadians]
                    }
                },
                startDate: { $lte: today },
                endDate: { $gte: today }
            }, {
                locationHistory: 0
            }).populate('packageId');

            // If we have enough promotional banners, return them
            if (promotionalBanners.length >= desiredBannerCount) {
                return {
                    banners: promotionalBanners,
                    source: 'promotional'
                };
            }
            const regularBannersNeeded = desiredBannerCount - promotionalBanners.length;
            const regularBanners = await Banner.find({
                isActive: true
            })
            .limit(regularBannersNeeded)
            .select('-__v');

            // Combine and format both types of banners
            const combinedBanners = promotionalBanners.map(banner => ({
                ...banner.toObject(),
                bannerType: 'promotional'
            })).concat(
                regularBanners.map(banner => ({
                    ...banner.toObject(),
                    bannerType: 'regular'
                }))
            );

            return {
                banners: combinedBanners,
            };

        } catch (err) {
            console.log("Error fetching banners within radius:", err);
            throw err;
        }
    },

    async updateBanner(bannerId,data) {

      let imageUrl = "";
      if (data.banner_image) {
        imageUrl = await ImageUploader.Upload(
          data.banner_image,
          "Banner_Promotion",
        );
      }

      const updatedBanner = await Promotional_Banner_model.findByIdAndUpdate(bannerId,{
        $set:{
          banner_title: data.banner_title,
          banner_image: imageUrl,
        }
      }, {new:true});

      if (!updatedBanner) {
          throw new Error('Banner not found for update');
      }

      return updatedBanner;
  },

};

export default PromotionalbannerService;

