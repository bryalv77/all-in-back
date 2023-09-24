/**
 * I18n dictionary for the en.
 */

const en = {
  app: {
    title: 'Application',
  },

  auth: {
    userNotFound: `Sorry, we don't recognize your credentials`,
    wrongPassword: `Sorry, we don't recognize your credentials`,
    weakPassword: 'This password is too weak',
    emailAlreadyInUse: 'Email is already in use',
    invalidEmail: 'Please provide a valid email',
    passwordReset: {
      invalidToken:
        'Password reset link is invalid or has expired',
      error: `Email not recognized`,
    },
    emailAddressVerificationEmail: {
      invalidToken:
        'Email verification link is invalid or has expired.',
      error: `Email not recognized.`,
      signedInAsWrongUser: `This email confirmation was sent to {0} but you're signed in as {1}.`,
    },
    passwordChange: {
      invalidPassword: 'The old password is invalid',
    },
  },

  user: {
    errors: {
      userAlreadyExists:
        'User with this email already exists.',
      userNotFound: 'User not found.',
      destroyingHimself: `You can't delete yourself.`,
      revokingOwnPermission: `You can't revoke your own admin permission.`,
      revokingPlanUser: `You can't revoke the admin permission of the plan manager.`,
      destroyingPlanUser: `You can't delete the plan manager.`,
    },
  },

  tenant: {
    exists:
      'There is already a workspace on this application.',
    url: {
      exists: 'This workspace URL is already in use.',
    },
    invitation: {
      notSameEmail: `This invitation was sent to {0} but you're signed in as {1}.`,
    },
    planActive: `There is a plan active for this workspace. Please cancel the plan first.`,
    stripeNotConfigured: 'Stripe is not configured.',
  },

  importer: {
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  errors: {
    notFound: {
      message: 'Not Found',
    },
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
  },

  email: {
    error: `Email provider is not configured.`,
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

  entities: {
    customer: {
      errors: {
        unique: {

        }
      }
    },
    product: {
      errors: {
        unique: {

        }
      }
    },
    order: {
      errors: {
        unique: {

        }
      }
    },
    operation: {
      errors: {
        unique: {
          fintonicId: 'FintonicId must be unique',
        }
      }
    },
    bank: {
      errors: {
        unique: {

        }
      }
    },
    category: {
      errors: {
        unique: {

        }
      }
    },
    taskList: {
      errors: {
        unique: {

        }
      }
    },
    tasks: {
      errors: {
        unique: {

        }
      }
    },
    tags: {
      errors: {
        unique: {

        }
      }
    },
    taskTags: {
      errors: {
        unique: {

        }
      }
    },
    subTasks: {
      errors: {
        unique: {

        }
      }
    },
    media: {
      errors: {
        unique: {

        }
      }
    },
    posts: {
      errors: {
        unique: {

        }
      }
    },
    followers: {
      errors: {
        unique: {

        }
      }
    },
    like: {
      errors: {
        unique: {

        }
      }
    },
    hashtag: {
      errors: {
        unique: {

        }
      }
    },
    postHashtag: {
      errors: {
        unique: {

        }
      }
    },
    artist: {
      errors: {
        unique: {

        }
      }
    },
    album: {
      errors: {
        unique: {

        }
      }
    },
    song: {
      errors: {
        unique: {

        }
      }
    },
    playlist: {
      errors: {
        unique: {

        }
      }
    },
    playlistSong: {
      errors: {
        unique: {

        }
      }
    },
    userPlaylist: {
      errors: {
        unique: {

        }
      }
    },
    city: {
      errors: {
        unique: {

        }
      }
    },
    country: {
      errors: {
        unique: {

        }
      }
    },
    address: {
      errors: {
        unique: {

        }
      }
    },
    productCategory: {
      errors: {
        unique: {

        }
      }
    },
    orderDetail: {
      errors: {
        unique: {

        }
      }
    },
    paymentMethods: {
      errors: {
        unique: {

        }
      }
    },
    productReview: {
      errors: {
        unique: {

        }
      }
    },
    promotions: {
      errors: {
        unique: {

        }
      }
    },
    course: {
      errors: {
        unique: {

        }
      }
    },
    teacher: {
      errors: {
        unique: {

        }
      }
    },
    lesson: {
      errors: {
        unique: {

        }
      }
    },
    courseEnrollment: {
      errors: {
        unique: {

        }
      }
    },
    student: {
      errors: {
        unique: {

        }
      }
    },
    courseComment: {
      errors: {
        unique: {

        }
      }
    },
    courseTransaction: {
      errors: {
        unique: {

        }
      }
    },
    courseCategory: {
      errors: {
        unique: {

        }
      }
    },
    categoryCourseRelation: {
      errors: {
        unique: {

        }
      }
    },
    courseProgress: {
      errors: {
        unique: {

        }
      }
    },
    message: {
      errors: {
        unique: {

        }
      }
    },
    conversation: {
      errors: {
        unique: {

        }
      }
    },
    conversationParticipant: {
      errors: {
        unique: {

        }
      }
    },
    business: {
      errors: {
        unique: {

        }
      }
    },
    businessCategory: {
      errors: {
        unique: {

        }
      }
    },
    service: {
      errors: {
        unique: {

        }
      }
    },
    availabilityTimeslot: {
      errors: {
        unique: {

        }
      }
    },
    appointment: {
      errors: {
        unique: {

        }
      }
    },
    brand: {
      errors: {
        unique: {

        }
      }
    },
    deliveryMethod: {
      errors: {
        unique: {

        }
      }
    },
  }
};

export default en;
