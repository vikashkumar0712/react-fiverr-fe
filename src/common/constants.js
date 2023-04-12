const constants = {
  ENUMS: {
    BE_BASE_URL: "http://localhost:8002/",

    SORT: {
      ASC: "asc",
      DESC: "desc",
    },

    ORDER_BY: {
      NEWEST: "createdAt",
      BEST_SELLING: "sales",
    },

    ROLE: {
      USER: "user",
      ADMIN: "admin",
      SELLER: "seller",
      BUYER: "buyer",
    },

    ASSETS: {
      VIDEOS: {
        PROMO:
          "https://link.storjshare.io/jvlh23ehzpij4kuwzry7dfuebjja/react-fiverr-bucket%2Fassets%2Fvideos%2Fpromo.mp4?wrap=0",
      },

      IMAGES: {
        AVATAR:
          "https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg",
        POSTER:
          "https://link.storjshare.io/s/jvtxxc64egnlxhutmo5xghayw62a/react-fiverr-bucket/assets/images/me.png?wrap=0",
        POSTER_BUSINESS:
          "https://fiverr-res.cloudinary.com/q_auto,f_auto,w_836,dpr_1.0/v1/attachments/generic_asset/asset/7d30a5eab61a328ed8c036a1d998595d-1599837114294/business-mobile-836-x1.png",
      },

      ICONS: {
        SEARCH:
          "https://link.storjshare.io/jvlax7hn43we5tugyd3s6cwp6vpa/react-fiverr-bucket%2Fassets%2Fimages%2Fsearch.svg?wrap=0",
        ACCESSIBILITY:
          "https://link.storjshare.io/jw5zm7g2gekw47aiowoimrkgryvq/react-fiverr-bucket%2Fassets%2Fimages%2Faccessibility.svg?wrap=0",
        CHAT: "https://link.storjshare.io/jvcoubjqgcjszjqvjppoksjkqs5a/react-fiverr-bucket%2Fassets%2Fimages%2Fchat.svg?wrap=0",
        CHECK:
          "https://link.storjshare.io/jww3ptwvdaqvetejfvel3gh5c3ia/react-fiverr-bucket%2Fassets%2Fimages%2Fcheck.svg?wrap=0",
        CLOCK:
          "https://link.storjshare.io/jxdattspwdzl4q5jqhhpy6l6er6a/react-fiverr-bucket%2Fassets%2Fimages%2Fclock.svg?wrap=0",
        COIN: "https://link.storjshare.io/juryj4wsjkbdvmfkliw7rukluxka/react-fiverr-bucket%2Fassets%2Fimages%2Fcoin.svg?wrap=0",
        DELETE:
          "https://link.storjshare.io/jvk3i5ytdcelt4xzieke3vlwefcq/react-fiverr-bucket%2Fassets%2Fimages%2Fdelete.svg?wrap=0",
        DISLIKE:
          "https://link.storjshare.io/jupzo34zejs52ksld2hgb5eekleq/react-fiverr-bucket%2Fassets%2Fimages%2Fdislike.svg?wrap=0",
        DOWN: "https://link.storjshare.io/jukn24f2f3txujsj5mj4jvlt737q/react-fiverr-bucket%2Fassets%2Fimages%2Fdown.svg?wrap=0",
        FACEBOOK:
          "https://link.storjshare.io/jvlu4y5qwmeb2pfek3f62b3mqabq/react-fiverr-bucket%2Fassets%2Fimages%2Ffacebook.svg?wrap=0",
        GREEN_CHECK:
          "https://link.storjshare.io/jwpbv5xyfgbemz3ye2dkubllyyoq/react-fiverr-bucket%2Fassets%2Fimages%2Fgreencheck.svg?wrap=0",
        HEART:
          "https://link.storjshare.io/s/jud7xzptbrr6fquu4y4e6q77k2jq/react-fiverr-bucket/assets/images/heart.svg?wrap=0",
        INSTAGRAM:
          "https://link.storjshare.io/jwbdcpqvpgqb5dtkqoik2uadk2ma/react-fiverr-bucket%2Fassets%2Fimages%2Finstagram.svg?wrap=0",
        LANGUAGE:
          "https://link.storjshare.io/jvtiayvv25fhekliyxfkyvpxl56a/react-fiverr-bucket%2Fassets%2Fimages%2Flanguage.svg?wrap=0",
        LIKE: "https://link.storjshare.io/jwraczyjmz7totuqgbjqc3gt5ugq/react-fiverr-bucket%2Fassets%2Fimages%2Flike.svg?wrap=0",
        LINKEDIN:
          "https://link.storjshare.io/jxdftakyqeoh3chn4nrugxzapmma/react-fiverr-bucket%2Fassets%2Fimages%2Flinkedin.svg?wrap=0",
        PINTEREST:
          "https://link.storjshare.io/jx2d45yruzhjewdvv7ufshcs7cfq/react-fiverr-bucket%2Fassets%2Fimages%2Fpinterest.svg?wrap=0",
        RECYCLE:
          "https://link.storjshare.io/juxs7cfqqmjjfy7jvryrwglunrcq/react-fiverr-bucket%2Fassets%2Fimages%2Frecycle.svg?wrap=0",
        STAR: "https://link.storjshare.io/jub63xa6vnl2pa6b7725wmpcvcvq/react-fiverr-bucket%2Fassets%2Fimages%2Fstar.svg?wrap=0",
        TWITTER:
          "https://link.storjshare.io/jvjd6t2spwqd3i6ko3vb7gv5xsbq/react-fiverr-bucket%2Fassets%2Fimages%2Ftwitter.svg?wrap=0",
        EXIT: "https://link.storjshare.io/jx5ysvh46cjhliun62npo6irrfsq/react-fiverr-bucket%2Fassets%2Fimages%2Fexit.svg?wrap=0",
        MESSAGES:
          "https://link.storjshare.io/juo5k2xwozroc5urecavj55bdgla/react-fiverr-bucket%2Fassets%2Fimages%2Fmessages.svg?wrap=0",
        ORDERS:
          "https://link.storjshare.io/jxzq32errspqsjdyzqbvbfayvhya/react-fiverr-bucket%2Fassets%2Fimages%2Forders.svg?wrap=0",
        ADD: "https://link.storjshare.io/juycz6p6dxemo6465pvpkzmxykyq/react-fiverr-bucket%2Fassets%2Fimages%2Fadd.svg?wrap=0",
        VERIFIED:
          "https://link.storjshare.io/juw5jdgzc3ex7d4j2axwdroor35q/react-fiverr-bucket%2Fassets%2Fimages%2Fverified.svg?wrap=0",
        HOME: "https://link.storjshare.io/jxwamyak3mnm3iwk47w4lqzzp5ha/react-fiverr-bucket%2Fassets%2Fimages%2Fhome.svg?wrap=0",
      },

      TRUSTED_BY: {
        FACEBOOK_LOGO:
          "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/facebook2x.188a797.png",
        GOOGLE_LOGO:
          "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/google2x.06d74c8.png",
        NETFLIX_LOGO:
          "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/netflix2x.887e47e.png",
        PNG: "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/pandg2x.6dc32e4.png",
        PAYPAL_LOGO:
          "https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/paypal2x.22728be.png",
      },
    },
  },

  RESP_ERR_CODES: {
    ERR_400: 400,
    ERR_401: 401,
    ERR_422: 422,
    ERR_500: 500,
    ERR_403: 403,
    ERR_404: 404,
    ERR_405: 405,
    ERR_409: 409,
    ERR_410: 410,
    ERR_412: 412,
    ERR_NETWORK: "ERR_NETWORK",
  },

  ERROR_MESSAGES: {
    FEATURE_NOT_VALID: "Please enter a feature before add!",
    ORDER_CANCEL:
      "Order canceled -- continue to shop around and checkout when you're ready.",
    NOT_AUTHORIZED: "You are not authorized",
    USER_NOT_FOUND: "User not found.",
    USER_ALREADY_EXISTS: "User already exists",
    INVALID_PASSWORD: "Invalid Password",
    RECORD_NOT_FOUND: "Record not found.",
    PASSWORD_NOT_MATCHED: "Password not matched",
    SAME_OLD_PASSWORD: "Same as old",
    PRODUCT_NOT_FOUND: "Product not found",
    NOT_SUBSCRIBED: "Not subscribed or no active plan",
    ALREADY_SUBSCRIBED: "Already subscribed to a plan",
    ALREADY_PURCHASED: "Already purchased",
    SUBSCRIPTION_EXPIRED: "Subscription expired",
    PRODUCT_IS_ALREADY_DOWNLOADED: "Product is already downloaded",
    LIMIT_REACHED: "Limit reached",
    HASH_EXPIRED: "Hash expired",
    HASH_NOT_FOUND: "Link is expired.",
    ADDRESS_NOT_FOUND: "User billing address not found.",
    SESSIONS_NOT_FOUND: "Stripe session_id not found.",
    PAYMENT_PENDING: "Payment Pending.",
    PLAN_NOT_FOUND: "Plan not found.",
    FORGOT_PASSWORD_REQUEST: `The account currently has no password set. We recommend requesting a 'Forgot Password'.`,
  },

  SUCCESS_MESSAGES: {
    GIG_DELETE: "Gig deleted successfully",
    FAV_REMOVE: "Gig remove from My Favorites",
    GIG_ADD: "New Gig added successfully",
    REVIEW_DELETE: "Review deleted successfully",
    ORDER_SUCCESS: "🎉 Order placed! You will redirecting to Orders page.",
    EMAIL_SEND: "Email send successfully",
    OK: "OK",
    REGISTERED: "Registered",
    PASSWORD_CHANGED: "Password changed",
    PASSWORD_SET: "Password set successfully",
    PASSWORD_RESET: "Password reset successfully",
    EMAIL_UPDATED: "Email updated successfully",
    USER_LOGGED_OUT: "User logged out successfully",
    USER_LOGGED_IN: "User logged in successfully",
  },

  INS_EXCLUDE_COLS: ["created_at", "updated_at", "deleted_at"],

  ROUTES: {
    NOT_FOUND: "*",
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    GIGS: "/gigs",
    GIG_WITH_ID: "/gig/:id",
    ORDERS: "/orders",
    MY_GIGS: "/my-gigs",
    MY_FAVORITES: "/my-favorites",
    ADD: "/add",
    MESSAGES: "/messages",
    MESSAGE_WITH_ID: "/message/:id",
  },

  LOCAL_STORAGE: {
    CURRENT_USER: "currentUser",
  },

  PARAMS: {
    IMAGE_UPLOADING: {
      pending: "Uploading image...",
      success: "Image uploaded successfully!",
      error: "Failed to upload image. Please try again.",
    },
    COVER_UPLOADING: {
      pending: "Uploading cover image...",
      success: "Cover image uploaded successfully!",
      error: "Failed to upload cover image. Please try again.",
    },
    IMAGES_UPLOADING: {
      pending: "Uploading multiple images...",
      success: "Multiple images uploaded successfully!",
      error: "Failed to upload multiple images. Please try again.",
    },
    PAYMENT_PROCESSING: {
      pending: "Payment link processing...",
      success: "Redirecting to checkout page...",
    },
  },

  REDUCER: {
    ADD_GIG: {
      ACTION_TYPES: {
        CHANGE_INPUT: "CHANGE_INPUT",
        ADD_IMAGES: "ADD_IMAGES",
        ADD_FEATURE: "ADD_FEATURE",
        REMOVE_FEATURE: "REMOVE_FEATURE",
      },
    },
  },
};

export default constants;
