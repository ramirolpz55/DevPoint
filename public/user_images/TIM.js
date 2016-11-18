user.create({
                username: "tdhwang",
                firstName: "Tim",
                lastName: "Hwang",
                email: "tdhwang@uci.edu",
                password: "$2a$10$0.W5NGZ2pfVRXiKbI/9.GeoEYbe5L3bLSx0/A6AYcong2omOwghH.",
                description: "My name is Tim and I love to snowboard and play videogames. " +
                "I specialize in automation functions and QA testing for different areas of a platform.  " +
                "Passion is in the eye of the beholder and one will always have room for improvement. " +
                "Team Mystic all day every day.",
                linkGitHub: "https://github.com/tdhwang",
                linkFacebook: "https://www.facebook.com/tim.hwang.31",
                linkStack: "",
                linkTwitter: "",
                linkLinkedIn: "https://www.linkedin.com/in/timothy-hwang-944239105",
                headline: "Hello my name is Tim " +
                "A pleasure to meet you!"
            })
                .then(function (userData) {
                    userId = userData.dataValues.id;
                })
                .then(function(userData) {
                    console.log(userId);
                    project.bulkCreate([
                        {
                            UserId: userId,
                            name: "Music Playlist",
                            linkLiveDemo: "",
                            description: "An application where one can create a music playlist",
                            linkGitHub: "https://github.com/tdhwang/MUSIC-PLAYER-PLAYLIST"
                        },
                        {
                            UserId: userId,
                            name: "Pokemon Guessing Game",
                            linkLiveDemo: "",
                            description: "Choose a pokemon and add to the correct number",
                            linkGitHub: "https://github.com/tdhwang/week-4-game"
                        }
                    ]).then(function (projectData) {
                        console.log("Projects added for " + userData.name)
                    });
                })