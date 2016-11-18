user.create({
                username: "jTiongson",
                firstName: "Jemma",
                lastName: "Tiongson",
                email: "jtiongson@gmail.com",
                password: "$2a$10$kUBvM0Czt0SSP9H1glH9lu49wwtvtfxLDeH0q93Z66Tbiirvxcnsq",
                description: "I am currently a student at UCLA Coding Bootcamp training to become a Jr. Web Developer. I aim to intern at a small web-dev company to enrich my coding skills as I pursue my Computer Science B.S at Cal State University Northridge.",
                linkGitHub: "https://github.com/jemmamariex3",
                linkFacebook: "",
                linkStack: "https://stackoverflow.com/users/7017647/jemmamariex3",
                linkTwitter: "",
                linkLinkedIn: "https://www.linkedin.com/in/jemma-tiongson-a6b027b0",
                headline: "Jr. Web Developer"
            })
                .then(function (userData) {
                    userId = userData.dataValues.id;
                })
                .then(function(userData) {
                    console.log(userId);
                    project.bulkCreate([
                        {
                            UserId: userId,
                            name: "Burger App",
                            linkLiveDemo: "",
                            description: "The Burger app incorporates handlebars, MySQL and the MVC model skills that allows user to devour choices of burgers.",
                            linkGitHub: "https://github.com/jemmamariex3/Week-15---Burger-2"
                        },
                        {
                            UserId: userId,
                            name: "MyPolity",
                            linkLiveDemo: "",
                            description: "MyPolity is a web app that gives users information about their federal, state and local government representatives.",
                            linkGitHub: "https://github.com/jackemuk/MyPolity"
                        }
                    ]).then(function (projectData) {
                        console.log("Projects added for " + userData.name)
                    });
                })