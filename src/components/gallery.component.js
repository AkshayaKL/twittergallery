import React, { useEffect, useState } from "react";
import { getImages } from "../services/gallery.service";
import "./gallery.component.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button,TextField, CardMedia } from "@material-ui/core";


export default function Gallery() {
  const useStyles = makeStyles((theme) => ({
    media: {
      padding: "56.25%",
    },
  }));
  const classes = useStyles();
  const [imageInFocus, setImageInFocus] = useState({});
  const [openImage, setOpenImage] = useState(false);
  const [images, setImages] = useState([]);
  const [searchValue,setSearchValue] = useState('')
  useEffect(() => {
    getImages().then((imageResponse) => {
      setImages(imageResponse.data.data.children);
      console.log(imageResponse.data.data.children);
    });
  }, []);

  var handleClose = () => {
    setOpenImage(false);
  };

  return (
    <div id="container">
     <div id="searchBar">
         <TextField
         placeholder="Search for titles"
         fullWidth
         value={searchValue}
         onChange={(e)=>{
             setSearchValue(e.currentTarget.value);

         }}
         >

         </TextField>
     </div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={openImage}
        style={{ visibility: openImage ? "visible" : "hidden" }}
      >
        <DialogTitle id="form-dialog-title">Image</DialogTitle>
        <DialogContent>
          <Card>
            <CardMedia>
              <img
                style={{ width: "100%", height: "100%" }}
                src={imageInFocus.thumbnail}
                alt={imageInFocus.title}
              />
            </CardMedia>
            <CardContent>
              {imageInFocus.title}
              <br />
              {<strong>Authored by {imageInFocus.author}</strong>}
              <br />
              {imageInFocus.ups}{" "}
              <ThumbUpIcon style={{ position: "relative", top: "+3px" }} />
              {imageInFocus.downs}{" "}
              <ThumbDownIcon style={{ position: "relative", top: "+3px" }} />
              <p>{imageInFocus.description}</p>
              
            </CardContent>
           
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          
        </DialogActions>
      </Dialog>

      <div class="mainContainer" id="grid">
        {images.filter((image)=>{return image.data.title.toLowerCase().includes(searchValue.toLowerCase())}).map((image) => {
          return (
            <Card
              onClick={() => {
                setImageInFocus(image.data);
                setOpenImage(true);
              }}
              class="image"
              id={image.data.title}
              key={image.data.title}
            >
              <CardMedia
                className={classes.media}
                image={image.data.thumbnail}
              />
              <CardContent id="title">
                <Typography variant="body2" color="textSecondary">
                  {image.data.title}
                </Typography>
              </CardContent>
              
            </Card>
          );
        })}
      </div>
    </div>
  );
}
