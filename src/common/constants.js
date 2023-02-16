const constants = {
  ENUMS: {
    ORDER: {
      ASC: "asc",
      DESC: "desc",
    },
    ROLE: {
      USER: "user",
      ADMIN: "admin",
    },
    ASSETS: {
      IMAGES: {
        MY_POSTER:
          "https://link.storjshare.io/jwex5irwzbbgxtudo274yt3vnymq/react-fiverr-bucket%2Fassets%2Fimages%2Fmy_profile.png?wrap=0",
        POSTER:
          "https://link.storjshare.io/s/jwnvbxo5w4wokn7mbjxkq2lc576q/react-fiverr-bucket/assets/images/man.png?wrap=0",
      },
      ICONS: {
        SEARCH:
          "https://link.storjshare.io/jvjjjueaip7fm5d3h67z6ibekd7a/react-fiverr-bucket%2Fassets%2Fimages%2Fsearch.png?wrap=0",
        ACCESSIBILITY:
          "https://link.storjshare.io/jumpe7qrgowye3mdcwg5gzzvq4ya/react-fiverr-bucket%2Fassets%2Fimages%2Faccessibility.png?wrap=0",
        CHECK:
          "https://link.storjshare.io/jvrnyfb5xa2os4sntsogjflkutna/react-fiverr-bucket%2Fassets%2Fimages%2Fcheck.png?wrap=0",
        CLOCK:
          "https://link.storjshare.io/ju3tzhb7ua5hxi7rxs2fnkwmlxaq/react-fiverr-bucket%2Fassets%2Fimages%2Fclock.png?wrap=0",
        COIN: "https://link.storjshare.io/jvp3imxmbm7qywudhfinh2avvysa/react-fiverr-bucket%2Fassets%2Fimages%2Fcoin.png?wrap=0",
        DELETE:
          "https://link.storjshare.io/juzmkbahga6nr7pvltl223zh3jxq/react-fiverr-bucket%2Fassets%2Fimages%2Fdelete.png?wrap=0",
        DISLIKE:
          "https://link.storjshare.io/juqgtavbisgo26oyhp7d7qpwukfa/react-fiverr-bucket%2Fassets%2Fimages%2Fdislike.png?wrap=0",
        DOWN: "https://link.storjshare.io/juc45lcrn5qhlz3is6vgsbkrw5ka/react-fiverr-bucket%2Fassets%2Fimages%2Fdown.png?wrap=0",
        FACEBOOK:
          "https://link.storjshare.io/juq5taluvksrxlgyzksj5ddbbupa/react-fiverr-bucket%2Fassets%2Fimages%2Ffacebook.png?wrap=0",
        GREEN_CHECK:
          "https://link.storjshare.io/jwrmmgx656bcdnnjg3exzpxvyewq/react-fiverr-bucket%2Fassets%2Fimages%2Fgreencheck.png?wrap=0",
        HEART:
          "https://link.storjshare.io/jxblvh5rsmcmxfq5syopyr4mbcwq/react-fiverr-bucket%2Fassets%2Fimages%2Fheart.png?wrap=0",
        INSTAGRAM:
          "https://link.storjshare.io/jx467krgrm3arhfdz2xfl2f2jwca/react-fiverr-bucket%2Fassets%2Fimages%2Finstagram.png?wrap=0",
        LANGUAGE:
          "https://link.storjshare.io/jxfa7k3dbspmwbtvrisc7536nila/react-fiverr-bucket%2Fassets%2Fimages%2Flanguage.png?wrap=0",
        LIKE: "https://link.storjshare.io/jv4xfw5bomtooll3q7ecn7kxrzka/react-fiverr-bucket%2Fassets%2Fimages%2Flike.png?wrap=0",
        LINKEDIN:
          "https://link.storjshare.io/jujvcbgvh6yeos52tjosqatb6kqq/react-fiverr-bucket%2Fassets%2Fimages%2Flinkedin.png?wrap=0",
        MESSAGE:
          "https://link.storjshare.io/jwgxdplr36wfzzyqw225yyrdci5a/react-fiverr-bucket%2Fassets%2Fimages%2Fmessage.png?wrap=0",
        PINTEREST:
          "https://link.storjshare.io/jxv6kq3kga3hvoaowxkatccwfdnq/react-fiverr-bucket%2Fassets%2Fimages%2Fpinterest.png?wrap=0",
        RECYCLE:
          "https://link.storjshare.io/jwfyv3as7mbcdgkwtphelbefzr2q/react-fiverr-bucket%2Fassets%2Fimages%2Frecycle.png?wrap=0",
        STAR: "https://link.storjshare.io/jukdhjt5onnatouxk3ipis6nxmqq/react-fiverr-bucket%2Fassets%2Fimages%2Fstar.png?wrap=0",
        TWITTER:
          "https://link.storjshare.io/jxki7eylxxaasefzdruh4dw32gvq/react-fiverr-bucket%2Fassets%2Fimages%2Ftwitter.png?wrap=0",
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
  },
  ERROR_MESSAGES: {
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
    ADDRS_NOT_FOUND: "User billing address not found.",
    SESSIONS_NOT_FOUND: "Stripe session_id not found.",
    PAYMENT_PENDING: "Payment Pending.",
    PLAN_NOT_FOUND: "Plan not found.",
    FORGOT_PASSWORD_REQUEST: `The account currently has no password set. We recommend requesting a 'Forgot Password'.`,
  },
  SUCCESS_MESSAGES: {
    EMAIL_SEND: "Email send successfully",
    OK: "OK",
    REGISTERED: "Registered",
    PASSWORD_CHANGED: "Password changed",
    PASSWORD_SET: "Password set successfully",
    PASSWORD_RESET: "Password reset successfully",
    EMAIL_UPDATED: "Email updated successfully",
  },
  INS_EXCLUDE_COLS: ["created_at", "updated_at", "deleted_at"],
};

export default constants;
