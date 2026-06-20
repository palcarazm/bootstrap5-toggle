import banner from "postcss-banner";
import { bannerContent } from "./scripts/package-banner.js";

export default {
    plugins: [
        banner({ banner: bannerContent }),
    ]
};