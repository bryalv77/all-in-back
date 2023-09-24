/**
 * Storage permissions.
 *
 * @id - Used to identify the rule on permissions and upload.
 * @folder - Folder where the files will be saved
 * @maxSizeInBytes - Max allowed size in bytes
 * @bypassWritingPermissions - Does not validate if the user has permission to write
 * @publicRead - The file can be publicly accessed via the URL without the need for a signed token
 */
export default class Storage {
  static get values() {
    return {
      userAvatarsProfiles: {
        id: 'userAvatarsProfiles',
        folder: 'user/avatars/profile/:userId',
        maxSizeInBytes: 10 * 1024 * 1024,
        bypassWritingPermissions: true,
        publicRead: true,
      },
      settingsLogos: {
        id: 'settingsLogos',
        folder: 'tenant/:tenantId/settings/logos',
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },
      settingsBackgroundImages: {
        id: 'settingsBackgroundImages',
        folder:
          'tenant/:tenantId/settings/backgroundImages',
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },


      productPhotos: {
        id: 'productPhotos',
        folder: 'tenant/:tenantId/product/photos',
        maxSizeInBytes: 1000000,
      },

      orderAttachments: {
        id: 'orderAttachments',
        folder: 'tenant/:tenantId/order/attachments',
        maxSizeInBytes: 1000000,
      },

      operationReceipt: {
        id: 'operationReceipt',
        folder: 'tenant/:tenantId/operation/receipt',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      bankLogo: {
        id: 'bankLogo',
        folder: 'tenant/:tenantId/bank/logo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      categoryLogo: {
        id: 'categoryLogo',
        folder: 'tenant/:tenantId/category/logo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },











      mediaFile: {
        id: 'mediaFile',
        folder: 'tenant/:tenantId/media/file',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      postsMedia: {
        id: 'postsMedia',
        folder: 'tenant/:tenantId/posts/media',
        maxSizeInBytes: 100 * 1024 * 1024,
      },









      artistPhoto: {
        id: 'artistPhoto',
        folder: 'tenant/:tenantId/artist/photo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      albumCover: {
        id: 'albumCover',
        folder: 'tenant/:tenantId/album/cover',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      songMedia: {
        id: 'songMedia',
        folder: 'tenant/:tenantId/song/media',
        maxSizeInBytes: 100 * 1024 * 1024,
      },













      productCategoryPhoto: {
        id: 'productCategoryPhoto',
        folder: 'tenant/:tenantId/productCategory/photo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },











      teacherPhoto: {
        id: 'teacherPhoto',
        folder: 'tenant/:tenantId/teacher/photo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      lessonMedia: {
        id: 'lessonMedia',
        folder: 'tenant/:tenantId/lesson/media',
        maxSizeInBytes: 100 * 1024 * 1024,
      },



      studentPhoto: {
        id: 'studentPhoto',
        folder: 'tenant/:tenantId/student/photo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      courseCommentMedia: {
        id: 'courseCommentMedia',
        folder: 'tenant/:tenantId/courseComment/media',
        maxSizeInBytes: 100 * 1024 * 1024,
      },



      courseCategoryPhoto: {
        id: 'courseCategoryPhoto',
        folder: 'tenant/:tenantId/courseCategory/photo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },





      messageMedia: {
        id: 'messageMedia',
        folder: 'tenant/:tenantId/message/media',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      conversationAvatar: {
        id: 'conversationAvatar',
        folder: 'tenant/:tenantId/conversation/avatar',
        maxSizeInBytes: 100 * 1024 * 1024,
      },



      businessLogo: {
        id: 'businessLogo',
        folder: 'tenant/:tenantId/business/logo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      businessCategoryLogo: {
        id: 'businessCategoryLogo',
        folder: 'tenant/:tenantId/businessCategory/logo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      servicePhoto: {
        id: 'servicePhoto',
        folder: 'tenant/:tenantId/service/photo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },





      brandPhoto: {
        id: 'brandPhoto',
        folder: 'tenant/:tenantId/brand/photo',
        maxSizeInBytes: 100 * 1024 * 1024,
      },


    };
  }
}
