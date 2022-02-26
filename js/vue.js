const vueApp = {

    data() {

        return{

            // Navbar elements
            links: [
                { title: "Home", value: 0, disabled: false },
                { title: "About me", value: 1, disabled: false },
                { title: "Skills", value: 2, disabled: false },
                { title: "Projects", value: 3, disabled: false },
            ],

            // Titles icons
            icons: [
                'fa-home',
                'fa-user',
                'fa-layer-group'
            ],

            // Active or deactivate home
            section: "Home",

            // Titles and texts of different sections
            content: {
                home:{
                    title:  "Welcome to my resume!",
                    text1:  "This site is open to anyone looking for some information about me." + "\n" +
                            "It could also be that you ended up here by accident, but take a look and maybe you will be interested in me <b>(in a professional way, of course)</b>.",
                    section1Title: "Know my skills",
                    section1Text: "Here you will find which technologies I am in, which ones I have basic knowledge on and which ones make me curious to learn.",
                    section2Title: "Visit my Github page",
                    section2Text: "and find in which projects I'm working on! (maybe none right now, at the moment).",
                },
                about:{
                    title1:  "A little about me",
                    title2:  "Education",
                    title3:  "Experience",
                    personal:  "Wanting to work in this virtual world that is the internet begins with being a videogames player. " +
                            "Videogames have always caught my attention and I wanted to enter the world of programming because of them." + "\n\n" +
                            "Right now, I've finished my studies on <b>Web development</b>, identifying myself as a front-end / full-stack developer. " + 
                            "Javascript is my <b>main stack</b>, but I also have knowledge of other languages ​​and I would like to continue learning different technologies" + "\n\n" +
                            "My purpose is not to master a lot of technologies, but I want <b>to learn as much as I can</b>, whether in a work environment, studying or combining both. " +
                            "I consider myself an organized person, self-taught and with whom it is easy to work so, if you are <b>looking for someone for your team</b>, here I leave my contact information:",
                    
                    section1Title: "Know my skills",
                    section1Text: "Here you will find which technologies I am in, which ones I have basic knowledge on and which ones make me curious to learn.",
                    section2Title: "Hobbies",
                    section2Text: "<ul class='p-3 mb-0'><li class='py-1'>Playing the guitar.</li><li class='py-1'>Play some videogames.</li><li class='py-1'>To have ideas that I never develop.</li><li class='py-1'>Listen to different genres of music. I have a wide sense of taste.</li></ul>",
                },
            },

            // Studies
            education:[
                { place: "IES La Sénia, Paiporta (Spain)", title: "Certificate of Higher Education (HNC)", type: "Software and Web development", date: "2019 - 2021" },
                { place: "IES La Sénia, Paiporta (Spain)", title: "Vocational Education and Training (VET)", type: "IT & Computer Skills", date: "2018 - 2019" }
            ],

            // Working experience
            experience:[
                { place: "Ardis Software", title: "Work experience contract", type: "Angular / Node programmer", date: "Jul. - Currently working" },
                { place: "Ardis Software", title: "Training period", type: "Angular / Node programmer", date: "Jan. - Jun. 2021" },
                { place: "EMO - Especialistas en ortopedia", title: "Training period", type: "IT & PHP Programmer", date: "Mar. - Jun. 2019" }
            ],

            // Buttons text
            buttons:{
                tellMeMore: "Tell me more!",
                bringMeThere: "Bring me there!",
                takeALook: "Let's take a look",
                about: "About me",
                experience: "Education / Experience",
                contact: "Contact",
                contactMe: "Contact info"
            },

            scene3D: false,

            skills: [
                { name: 'JavaScript', icon: 'assets/icons/js_original.png' },
                { name: 'Vue.js', icon: 'assets/icons/vue_original.png' },
                { name: 'Angular', icon: 'assets/icons/Angular_original.png' },
                { name: 'Node.js', icon: 'assets/icons/node_original.png' },
                { name: 'Java', icon: 'assets/icons/java-icon.png' },
                { name: 'PHP', icon: 'assets/icons/php_original.png' },
                { name: 'Docker', icon: 'assets/icons/docker-icon.png' },
            ],

            projects: [
                { title: "Monster's cards", banner: 'bg-primary', link: 'https://jcarlosaguirre.github.io/react-project-1/', tech: 'React', icon: 'assets/icons/React_original.png' },
                /*{ title: 'Vue.js', banner: 'bg-primary', link: '#', tech: 'React', icon: 'assets/icons/vue_original.png' },
                { title: 'Angular', banner: 'bg-primary', link: '#', tech: 'React', icon: 'assets/icons/Angular_original.png' },
                { title: 'Node.js', banner: 'bg-primary', link: '#', tech: 'React', icon: 'assets/icons/node_original.png' },
                { title: 'Java', banner: 'bg-primary', link: '#', tech: 'React', icon: 'assets/icons/java-icon.png' },
                { title: 'PHP', banner: 'bg-primary', link: '#', tech: 'React', icon: 'assets/icons/php_original.png' },
                { title: 'Docker', banner: 'bg-primary', link: '#', tech: 'React', icon: 'assets/icons/docker-icon.png' },*/
            ]
  


        }
    },
    methods:{

        // Ahow a section or another
        setSection( value ){

            switch (value) {

                case 0:
                    this.section = "Home";
                    break;

                case 1:
                    this.section = "About me";
                    break;
                    
                case 2:
                    this.section = "Skills";

                    // Append three.js scene script to body if not rendered
                    if( !this.scene3D ){
                        let threejs = document.createElement('script')
                        threejs.setAttribute('src', 'js/scene.js')
                        document.body.appendChild(threejs)
                    }
                    break;
                    
                case 3:
                    this.section = "Projects";
                    break;
            }

            this.icons.forEach(icon => {
                console.log( icon );
                document.getElementById("header-icon").classList.remove( icon )
            })
            
            document.getElementById("header-icon").classList.add( this.icons[ value ] )
            
        },


    },
    mounted(){

        console.log( window );
    },
};

Vue.createApp(vueApp).mount('#app');