// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "Publications",
          description: "Selected and full publications in human-AI interaction, multisensory AI, and medical image computing.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-our-paper-approximate-resource-allocation-with-greedy-guarantees-under-non-supermodular-mse-was-accepted-to-ecc-2026",
          title: 'Our paper, Approximate Resource allocation with Greedy Guarantees under Non-supermodular MSE, was accepted...',
          description: "",
          section: "News",},{id: "news-tada-tada-tada-i-have-graduated-from-ucla-with-a-m-s-in-electrical-and-computer-engineering-and-will-join-boston-college-in-august-as-a-ph-d-student-in-computer-science",
          title: ':tada: :tada: :tada: I have graduated from UCLA with a M.S. in Electrical...',
          description: "",
          section: "News",},{id: "news-our-paper-ooprompt-reifying-intents-into-structured-artifacts-for-modular-and-iterative-prompting-was-accepted-to-eics-2026-round-3-and-will-appear-in-pacmhci",
          title: 'Our paper, OOPrompt: Reifying Intents into Structured Artifacts for Modular and Iterative Prompting,...',
          description: "",
          section: "News",},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/cv.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%74%65%6E%67%79%6F%75%78@%75%63%6C%61.%65%64%75", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=GTVF8HsAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
