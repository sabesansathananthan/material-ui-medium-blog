import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import PostCard from "./PostCard";
import axios from "axios";

// wrapper for items
const Slider = () => {
  const [itemRows, setItemRows] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [loading, setLoading] = useState(false);

  const mediumURL =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sabesan96";

  useEffect(() => {
    async function fetchPostDetails() {
      await axios.get(mediumURL).then((response) => {
        // create two-dimensional array with 3 elements per inner array
        const { data } = response;
        const avatarImg = data?.feed?.image;
        const profile = data.feed.link;
        const items = data.items; //This is an array with the content. No feed, no info about author etc..
        const posts = items.filter((item) => item.categories.length > 0);
        setAvatar(avatarImg);
        setProfileLink(profile);
        const blogs = [];
        posts.forEach((item, i) => {
          item["avatar"] = avatarImg; // push avatar inside the json
          item["profileLink"] = profile; // push profile link inside the JSON
          blogs.push(item);
        });
        const tagArrays = blogs.map((item) => {
          return item.categories;
        });

        const allTags = tagArrays.flat();

        const allTagsWithCount = allTags.reduce(function (
          tagsWithCount,
          currentTag
        ) {
          tagsWithCount[currentTag] = (tagsWithCount[currentTag] || 0) + 1; //increment the number of counts of a tag
          return tagsWithCount;
        },
        {});

        //sort the tag(key) according its count
        const sortedTagsArray = Object.keys(allTagsWithCount).sort(function (
          a,
          b
        ) {
          return allTagsWithCount[b] - allTagsWithCount[a];
        });

        const tagArticle = [];
        let removedBlogs = blogs;

        for (let i = 0; i < sortedTagsArray.length; ++i) {
          const blogsWithTag = removedBlogs.filter((blog) =>
            blog.categories.includes(sortedTagsArray[i])
          ); //filter

          removedBlogs = removedBlogs.filter(
            (blog) => blogsWithTag.indexOf(blog) == -1
          ); //exclude

          if (blogsWithTag.length > 0) {
            blogsWithTag.forEach((item) => {
              item[`tag`] = sortedTagsArray[i];
              tagArticle.push(item);
            });
          }
        }

        const filteredTagArrays = tagArticle.map((item) => {
          return item.tag;
        });

        const filteredAllTagsWithCount = filteredTagArrays.reduce(
          (tagsWithCount, currentTag) => {
            tagsWithCount[currentTag] = (tagsWithCount[currentTag] || 0) + 1; //increment the number of counts of a tag
            return tagsWithCount;
          },
          {}
        );

        //sort the tag(key) according its count
        const filteredSortedTagsArray = Object.keys(
          filteredAllTagsWithCount
        ).sort(function (a, b) {
          return filteredAllTagsWithCount[b] - filteredAllTagsWithCount[a];
        });

        tagArticle.forEach((item) => {
          item.tagNo = filteredSortedTagsArray.indexOf(item.tag) + 1;
        });

        const tagArticleWithRow = [];

        tagArticle.forEach((item, i) => {
          const row = Math.floor(i / 3);
          if (!tagArticleWithRow[row]) tagArticleWithRow[row] = [];
          tagArticleWithRow[row].push(item);
        });

        setItemRows(tagArticleWithRow);
        setLoading(true);
      });
    }
    fetchPostDetails();
  }, []);

  return (
    <Grid container spacing={1}>
      {loading &&
        itemRows.length > 0 &&
        itemRows.map((row, id) =>
          row.map((item, key) => <PostCard {...item} key={key} />)
        )}
    </Grid>
  );
};
export default Slider;
