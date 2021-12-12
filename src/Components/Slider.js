import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import PostCard from "./PostCard";
import axios from "axios";
import sortAndSetCategory from "../utils/SortAndSetCategeory";

// wrapper for items
const Slider = () => {
  const [itemRows, setItemRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const mediumURL =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sabesan96";

  useEffect(() => {
    async function fetchPostDetails() {
      await axios
        .get(mediumURL)
        .then((response) => {
          const {
            feed: { image, link },
            items,
          } = response?.data || {};

          const posts = items.filter((item) => item?.categories?.length > 0);

          const tagArrays = posts.map((item) => {
            return item.categories;
          });

          const allTags = tagArrays.flat();

          const sortedTagsArray = sortAndSetCategory(allTags) || [];

          const tagArticle = [];
          let removedBlogs = posts;

          for (let i = 0; i < sortedTagsArray.length; ++i) {
            const blogsWithTag = removedBlogs.filter((blog) =>
              blog.categories.includes(sortedTagsArray[i])
            ); //filter

            removedBlogs = removedBlogs.filter(
              (blog) => blogsWithTag.indexOf(blog) === -1
            ); //exclude

            if (blogsWithTag.length > 0) {
              blogsWithTag.forEach((item) => {
                item.tag = sortedTagsArray[i];
                tagArticle.push(item);
              });
            }
          }

          const filteredTagArrays = tagArticle.map((item) => {
            return item.tag;
          });

          const filteredSortedTagsArray =
            sortAndSetCategory(filteredTagArrays) || [];

          tagArticle.forEach((item) => {
            item.tagNo = filteredSortedTagsArray.indexOf(item.tag) + 1;
            item.avatar = image; // push avatar inside the json
            item.profileLink = link; // push profile link inside the JSON
          });

          const tagArticleWithRow = [];

          tagArticle.forEach((item, i) => {
            const row = Math.floor(i / 3);
            if (!tagArticleWithRow[row]) tagArticleWithRow[row] = [];
            tagArticleWithRow[row].push(item);
          });

          setItemRows(tagArticleWithRow);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    fetchPostDetails();
  }, []);

  return (
    <Grid container spacing={1}>
      {!loading &&
        itemRows.length > 0 &&
        itemRows.map((row, id) =>
          row.map((item, key) => <PostCard {...item} key={key} />)
        )}
    </Grid>
  );
};
export default Slider;
