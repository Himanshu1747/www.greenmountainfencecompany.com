query MainMenu {
  menu(id: "mainmenu", idType: SLUG) {
    menuItems(first: 100) {
      nodes {
        id
        label
        cssClasses
        url
        uri
        parentId
        target
        order
        childItems(first: 100) {
          nodes {
            id
            label
            url
            uri
            parentId
            order
            target
          }
        }
      }
    }
  }
  siteLogo {
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
}

query GetHomeSliders {
  homeSliders {
    nodes {
      id
      title
      featuredImage {
        node {
          sourceUrl
        }
      }
      homeslidermain {
        mobileBanner {
          node {
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
}

query CategoriesPage {
  catgoriesPages {
    nodes {
      id
      title
      slug
      uri
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      catgoriesPageLinks {
        pageLink {
          url
          title
          target
        }
      }
    }
  }
}

query Homepage {
  page(id: "/", idType: URI) {
    id
    title
    seo {
      canonical
      cornerstone
      fullHead
    }
    homepage {
      excellenceTitle
      bannerTitle
      bannerButton {
        url
        title
        target
      }
      bannerParagraph
      title
      descrption
      professionalImage {
        node {
          sourceUrl
          mediaItemUrl
          altText
        }
      }
      aboutTitle
      aboutDescription
      aboutButton {
        url
        title
        target
      }
      video {
        node {
          mediaItemUrl
          altText
        }
      }
      videoPoster {
        node {
          mediaItemUrl
          altText
        }
      }
    }
  }
}

query Review {
  page(id: "reviews", idType: URI) {
    title
    reviews {
      title
      subTitle
      quatationImagew {
        node {
          sourceUrl
          mediaItemUrl
          altText
        }
      }
    }
  }
}

query Testmonialcpt {
  testimonials {
    nodes {
      title
      content
      testimonials {
        ratingImage {
          node {
            sourceUrl
            mediaItemUrl
            altText
          }
        }
      }
    }
  }
}

query FAQDATA {
  faqs {
    nodes {
      title
      content
    }
  }
}

query Footermenu {
  menu(id: "footermenu", idType: SLUG) {
    menuItems(first: 100) {
      nodes {
        id
        label
        cssClasses
        url
        uri
        parentId
        target
        order
        childItems(first: 100) {
          nodes {
            id
            label
            url
            uri
            parentId
            order
            target
          }
        }
      }
    }
  }
}

query GetFooterData {
  footerbottom: sidebar(id: "footer-widget-1")
  footerlogo: sidebar(id: "sidebar-1")
  contactdetails: sidebar(id: "footer-widget-2")
  copyrights: sidebar(id: "copy-rights")
  protect: sidebar(id: "protect-text")
}

query Aboutpage {
  page(id: "about", idType: URI) {
    title
    seo {
      canonical
      cornerstone
      fullHead
    }
    featuredImage {
      node {
        mediaItemUrl
        altText
        fileSize
      }
    }
    aboutUs {
      excellenceTitle
      video {
        node {
          mediaItemUrl
          altText
        }
      }
      videoPoster {
        node {
          mediaItemUrl
          altText
        }
      }
      aboutUsTitle
      aboutDesc
    }
  }
}

query Reviewpage {
  page(id: "reviews", idType: URI) {
    title
    seo {
      canonical
      cornerstone
      fullHead
    }
    featuredImage {
      node {
        mediaItemUrl
        altText
        fileSize
      }
    }
  }
}

query blogpage {
  page(id: "blog", idType: URI) {
    title
    seo {
      canonical
      cornerstone
      fullHead
    }
    featuredImage {
      node {
        mediaItemUrl
        altText
        fileSize
      }
    }
    blogs {
      greenMountainTitle
    }
  }
}

query MainBlog {
  posts(first: 100) {
    nodes {
      id
      title
      slug
      date
      excerpt
      content
      featuredImage {
        node {
          mediaItemUrl
          altText
        }
      }
    }
  }
}

query faqpage {
  page(id: "faq", idType: URI) {
    title
    content
    seo {
      canonical
      cornerstone
      fullHead
    }
    featuredImage {
      node {
        mediaItemUrl
        altText
      }
    }
    faq {
      commonQuestionsTitle
      faqImage {
        node {
          mediaItemUrl
          altText
        }
      }
    }
  }
}

query whychoosus {
  page(id: "why-choose-us", idType: URI) {
    title
    seo {
      canonical
      cornerstone
      fullHead
    }
    featuredImage {
      node {
        mediaItemUrl
        altText
      }
    }
    whyChooseUs {
      whyChooseTitle
      whyChosseDesc
      bottomParagraph
      mainVideo {
        node {
          mediaItemUrl
        }
      }
      videoPoster {
        node {
          mediaItemUrl
        }
      }
      pageLink {
        pageLinks {
          url
          title
          target
        }
      }
    }
  }
}

query GetCedarWoodFence {
  page(id: "cedar-wood-fence", idType: URI) {
    title
    seo {
      canonical
      cornerstone
      fullHead
    }
    featuredImage {
      node {
        mediaItemUrl
        altText
      }
    }
    cedarWoodFence {
      propertyTitle
      descrptionmain
      galleryImage {
        nodes {
          altText
          sourceUrl
          mediaDetails {
            sizes {
              name
              sourceUrl
              width
              height
            }
          }
        }
      }
      mainTitlegreen
      greendescription
      greenimage {
        node {
          mediaItemUrl
          altText
        }
      }
    }
  }
}

query Contactus {
  page(id: "contact", idType: URI) {
    title
    seo {
      canonical
      cornerstone
      fullHead
    }
    contactUs {
      getConnectTittle
      contactFormTitle
      connectUs
      connectUsDesc
      contactDetails {
        iconImage {
          node {
            mediaItemUrl
            altText
          }
        }
        detailsContacts
      }
      backgroundImage {
        node {
          mediaItemUrl
          altText
        }
      }
    }
    featuredImage {
      node {
        mediaItemUrl
        altText
        fileSize
      }
    }
  }
}

query Estimatespage {
  page(id: "request-a-free-estimate-form", idType: URI) {
    title
    seo {
      canonical
      cornerstone
      fullHead
    }
    featuredImage {
      node {
        mediaItemUrl
        altText
        fileSize
      }
    }
    requestAEstimate {
      formTitle
      formDesc
    }
  }
}

<!-- NODE MAILER STEP DATA  -->

Set 1: npx astro add react node
Set 2: npm install nodemailer
Set 3:PUTL ALL SMTP DETAILS IN ENV FILE
Set 4:  src/actions/index.ts
Set 5: src/components/ContactForm.tsx
