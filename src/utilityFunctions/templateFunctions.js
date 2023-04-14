const setLocalStorage = async () => {
    const homePageInStorage = await checkHomePageinLocalStorage();

    const BlogsPageInStorage = await checkBlogsPageinLocalStorage();

    if (!homePageInStorage) {
      console.log("homepagenotinStorage");
      if (id === "001") {
        await fetchHomePageBlocks(blogTemplate.pages.HomePage.blocks);
      } else {
        await loadSavedHomePage();
      }
    }
    console.log("template", template);

    if (!BlogsPageInStorage) {
      console.log("BlogsPageNotInStorage");
      if (id === "001") {
        await fetchBlogsPageData(
          blogTemplate.pages.BlogsPage.blocks,
          blogTemplate.data.blogs
        );
      } else {
        await loadSavedBlogsPage();
      }
    }
    console.log("template", template);
     setMain(true);
      setLoading(false);
  };

const checkHomePageinLocalStorage = async () => {
    const homePage = template.pages?.HomePage;
    console.log("homePage", homePage);
    if (homePage) {
      setDataForMain(homePage.blocks);

      return true;
    } else {
      return false;
    }
  };
