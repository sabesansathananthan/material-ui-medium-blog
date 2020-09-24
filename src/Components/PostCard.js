import React from "react";
import ShortenText from "../utils/ShortenText";
import ToText from "../utils/ToText";
import { faUser, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  makeStyles,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Badge,
  withStyles,
  Link,
  CardActions,
  Divider,
} from "@material-ui/core";

const styles = makeStyles((muiBaseTheme) => ({
  grid: {
    marginTop: "20px",
    minHeight: "391px",
  },
  card: {
    maxWidth: 400,
    margin: "auto",
    transition: "0.3s",
    minHeight: "391px",
    borderRadius: ".625rem!important",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    minHeight: "10rem",
    position: "relative",
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing(3),
  },
  divider: {
    margin: `${muiBaseTheme.spacing(2)}px 0`,
  },
  heading: {
    fontFamily: "sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#3d5170",
    "&::hover": {
      color: "#2b394f",
    },
  },
  subheading: {
    fontFamily: ("Helvetica Neue", "Helvetica", "Arial", "sans-serif"),
    fontSize: "14px",
    lineHeight: 1.8,
  },
  avatar: {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    bottom: -136,
    boxShadow: " 0 0 0 0.125rem #fff, 0 0.1875rem 0.4375rem rgba(90,97,105,.5)",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing(),
    },
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    display: "flex",
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    bottom: -131,

    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export default function MediumCard(props) {
  const classes = styles();
  var shortMonthName = new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format;
  let date = new Date(props.pubDate);
  const publishDate =
    shortMonthName(date) +
    " " +
    date.getDate() +
    "," +
    " " +
    date.getFullYear();
  return (
    <Grid xs={12} sm={12} lg={4} className={classes.grid}>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={props.thumbnail}>
          <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
            style={{
              display: "inline-block",
              alignItems: "center",
              marginLeft: "1.5625rem",
            }}
          >
            <Avatar
              alt="sabesan sathananthan"
              className={classes.avatar}
              src={props.avatar}
              component="a"
              varient="rounded"
              href={props.profilelink}
              target="_blank"
            />
          </StyledBadge>
        </CardMedia>
        <CardContent
          className={classes.content}
          style={{
            paddingTop: "2.1875rem",
            minHeight: "120px",
            paddingBottom: "0",
          }}
        >
          <Typography className={classes.heading} variant={"h5"} gutterBottom>
            <Link
              href={props.link}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
            >
              {ShortenText(props.title, 0, 75)}
            </Link>
          </Typography>
          <Typography className={classes.subheading} variant="body1">
            {ShortenText(ToText(props.content), 0, 120) + "..."}
          </Typography>
        </CardContent>
        <Divider className={classes.divider} />
        <CardActions
          style={{ paddingLeft: "1.5625rem", paddingRight: "1.5625rem" }}
        >
          <Grid>
            <Typography
              style={{
                fontSize: "14px",
                color: "#212529",
              }}
              display="block"
              variant="body1"
              gutterBottom
            >
              <FontAwesomeIcon icon={faUser} /> {props.author}
            </Typography>
          </Grid>
          <Grid>
            <Typography
              display="block"
              variant="body1"
              style={{
                fontSize: "14px",
                color: "#868e96",
                display: "inline-block",
              }}
              gutterBottom
            >
              <FontAwesomeIcon icon={faCalendarAlt} /> {publishDate}
            </Typography>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}
