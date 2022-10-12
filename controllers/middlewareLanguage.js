var jwt = require('jsonwebtoken')

const middlewareLanguage = {

    //tao refresh token
    generateRefreshToken: (lang) => {
        return jwt.sign({ lang }, process.env.LANGUAGETOKEN_MK)
    },

    verifyCookieLanguare: (LanguageToken, req, res, next) => {
        jwt.verify(LanguageToken, process.env.LANGUAGETOKEN_MK, async (err, language) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Please try again language" })
            }

            switch (language.lang) {
                case "vi":
                    req.lang = 1
                    next()
                    break;
                case "jp":
                    req.lang = 2
                    next()
                    break;

                default:
                    req.lang = 0
                    next()
                    break;
            }

        })
    },

    //Language
    verifyCookiesLanguage: async (req, res, next) => {
        //lấy token refresh token từ người dùng
        const LanguageToken = req.cookies.CookiesLanguage

        if (!LanguageToken) {
            const newCookiesLanguage = await middlewareLanguage.generateRefreshToken('en')
            res.cookie("CookiesLanguage", newCookiesLanguage, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });

            middlewareLanguage.verifyCookieLanguare(LanguageToken, req, res, next)
        } else {
            middlewareLanguage.verifyCookieLanguare(LanguageToken, req, res, next)
        }


    },
    //cấp lại mã cookie language
    getNewCookieLanguage: async (req, res) => {
        var { languageClinet } = req.body

        if (!languageClinet) {
            return res.json({ success: false, message: 'Please select language' })
        }

        const newCookiesLanguage = await middlewareLanguage.generateRefreshToken(languageClinet)
        res.cookie("CookiesLanguage", newCookiesLanguage, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        });
        return res.json({ message: 'Đổi ngôn ngữ thành công' })
    }
}

module.exports = middlewareLanguage