import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));

export const bannerContent = `Copyright Notice
${pkg.name} v${pkg.version}
${pkg.homepage}
@author 2011-2014 Min Hur (https://github.com/minhur)
@author 2018-2019 Brent Ely (https://github.com/gitbrent)
@author 2022 Pablo Alcaraz Martínez (https://github.com/palcarazm)
@funding ${pkg.funding.type}
@see ${pkg.funding.url}
@license ${pkg.license}
@see https://github.com/palcarazm/bootstrap5-toggle/blob/master/LICENSE`;