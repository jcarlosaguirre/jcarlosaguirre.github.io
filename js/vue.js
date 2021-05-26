const vueApp = {

    data() {

        return{

            // Show or hide the menu
            openMenu: false,

            // Active or deactivate home
            section: "Home",

            content: {
                home:{
                    title:  "Welcome to my resume!",
                    text1:  "This site is open to anyone looking for some information about me." + "\n" +
                            "It could also be that you ended up here by accident, but take a look and maybe you will be interested in me (in a professional way, of course).",
                    section1Title: "Know my skills",
                    section1Text: "Here you will find which technologies I am in, which ones I have basic knowledge on and which ones make me curious to learn.",
                    section2Title: "Visit my Github repository",
                    section2Text: "and find in which projects I'm working on (maybe none right now, at the moment).",
                }
            },

            hola: true,

            buttons:{
                tellMeMore: "Tell me more!",
                bringMeThere: "Bring me there!",
                takeALook: "Let's take a look",
            },

            // Decorative section separators (filled in 'mounted' hook)
            separators: [],

            // Active or deactivate sections
            aboutSection: true,

            // Links of info in about section
            aboutLinks: [
                {title: "Biography", active: true},
                {title: "Languages", active: false},
                {title: "Skills", active: false},
            ],

            // List of languages and level in about section
            languages: [
                {lang: "English", points: 4},
                {lang: "Spanish", points: 5},
                {lang: "Catalan", points: 3},
            ],

            // List of skills with images and name
            skills: [
                {src: "./assets/icons/js-icon.png", text: "JavaScript"},
                {src: "./assets/icons/php-icon.png", text: "PHP"},
                {src: "./assets/icons/java-icon.png", text: "Java"},
                {src: "./assets/icons/vue-icon.png", text: "Vue.js"},
                {src: "./assets/icons/node-icon.png", text: "Node.js"},
                {src: "./assets/icons/angular-icon.png", text: "Angular"},
                {src: "./assets/icons/docker-icon.png", text: "Docker"},
                {src: "./assets/icons/vm-icon.png", text: "Virtual Box"},
            ],

            projectsSection : false,
        }
    },
    methods:{

        // Toggle menu
        showMenu(){
            
            // Change menu state
            this.openMenu = !this.openMenu;

            let i = 1;

            // Delay for other links
            let interval = setInterval(function () {

                // Clean interval when no more links available
                if (i == links.length - 1) clearInterval(interval);

                links[i].classList.toggle("hidden");
                i++;

            }, 200);

            // Toggle first element instantly
            links[0].classList.toggle("hidden");
        },

        // Ahow a section or another
        showSection( section ){

            switch (section) {

                case 0:
                    this.homeSection = true;
                    this.projectsSection = false;
                    this.aboutSection = false;
                    break;

                case 1:
                    this.homeSection = false;
                    this.projectsSection = false;
                    this.aboutSection = true;
                    break;
                    
                case 2:
                    this.homeSection = false;
                    this.aboutSection = false;
                    this.projectsSection = true;
                    break;
            }

            this.animateSeparator(section);
        },

        // Animate a delimiter or another based on chosen section
        animateSeparator( section ){

            // i to reduce, j to rise
            let i = 120;
            let j = 0;
        
            // Delay
            setTimeout(function () {

                // If we choose any section instead of 'home'
                if( section != 0){

                    // Select the right separator and reduce its height in a loop
                    let interval = setInterval(function () {
    
                        this.separators[section - 1].style.height = i + "px";
                        i--;
                
                        // Clear interval when separator its gone
                        if (i < 0) clearInterval(interval);
    
                    }.bind(this), 9);
                }

                // If we choose 'home'
                else{

                    // We use x because 'section' value is not useful here
                    let x = 0;
                    if( this.projectsSection ) x = 1;

                    let interval = setInterval(function () {

                        this.separators[ x ].style.height = j + "px";
                        j++;

                        if (j > 120) clearInterval(interval);

                    }.bind(this), 10);
                }

            }.bind(this), 200);
            
            

        },

        // When any inner section is toggled, deactivate every link
        // and active just the one selected
        activeInfo( section, index ){

            this.aboutLinks.forEach(link => {
                link.active = false;
            });

            switch ( section ) {
                case 'about':
                    
                    this.aboutLinks[ index ].active = true;
                    break;
            
                default:
                    break;
            }



        },

    },
    mounted(){

        // Get separators from sections
        this.separators = document.getElementsByClassName("separator");

        // On first load, wait to show home texts
        setTimeout( () =>{
            // this.homeSection = true;
        }, 50);

        console.log( window );
    },
};

Vue.createApp(vueApp).mount('#app');