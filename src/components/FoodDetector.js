import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@material-ui/core";
import * as tf from "@tensorflow/tfjs";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { CLASSESDIR } from "../env/classesDir";
import { useStyles } from "../styles";

const FoodDetector = (props) => {
  const { setFoodLabels } = props;
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    filename: "",
  });
  const [imageDemensions, setImageDemensions] = useState({
    width: null,
    height: null,
  });
  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const classes = useStyles()();

  useEffect(() => {
    const IMAGE_WIDTH = document.getElementById("image").width;
    const IMAGE_HEIGHT = document.getElementById("image").height;
    setImageDemensions({ width: IMAGE_WIDTH, height: IMAGE_HEIGHT });
  }, []);

  useEffect(() => {
    setFoodLabels([]);
  }, [data]);

  const handleClickOpen = () => {
    if (document.getElementById("canvas") != null) {
      document.getElementById("canvas").outerHTML = "";
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async (event) => {
    setLoading(true);
    event.preventDefault();
    await detectObjects(URL.createObjectURL(file));
    setSrc(URL.createObjectURL(file));
    setLoading(false);
    setOpen(false);
  };

  async function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(tf.browser.fromPixels(img));
      img.onerror = (err) => reject(err);
    });
  }

  const loadModel = async () => {
    const model = await tf.loadGraphModel("/assets/model/model.json");
    return model;
  };

  const buildDetectedObjects = (
    detectionScores,
    detectionBoxes,
    detectionClasses,
    classesDir
  ) => {
    const detectionObjects = [];
    detectionScores.forEach((score, index) => {
      if (score > 0.7) {
        const bbox = [];
        const ymin = detectionBoxes[index * 4] * imageDemensions.height;
        const xmin = detectionBoxes[index * 4 + 1] * imageDemensions.width;
        const ymax = detectionBoxes[index * 4 + 2] * imageDemensions.height;
        const xmax = detectionBoxes[index * 4 + 3] * imageDemensions.width;
        bbox[0] = xmin;
        bbox[1] = ymin;
        bbox[2] = xmax - xmin;
        bbox[3] = ymax - ymin;

        detectionObjects.push({
          class: detectionClasses[index],
          label: classesDir[detectionClasses[index]].name,
          score: score.toFixed(4),
          bbox: bbox,
        });
      }
    });
    return detectionObjects;
  };

  const drawBoxes = (bbox) => {
    const canvas = document.getElementById("canvas");

    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#00FF00";
    ctx.beginPath();
    ctx.rect(bbox[0], bbox[1], bbox[2], bbox[3]);
    ctx.stroke();
  };

  const detectObjects = async (src) => {
    const image = await loadImage(src);
    const model = await loadModel();

    const result = await model.executeAsync(image.expandDims(0));
    const detectionScores = result[4].dataSync();
    const detectionBoxes = result[6].dataSync();
    const detectionClasses = result[3].dataSync();

    const detectedObjects = buildDetectedObjects(
      detectionScores,
      detectionBoxes,
      detectionClasses,
      CLASSESDIR
    );

    if (detectedObjects.length > 0) {
      const imageRef = document.getElementById("image");
      const canvas = document.createElement("canvas");
      canvas.id = "canvas";
      canvas.width = imageDemensions.width;
      canvas.height = imageDemensions.height;
      document.getElementById("image_container").appendChild(canvas);
      canvas.style.position = "absolute";
      canvas.style.left = imageRef.offsetLeft + "px";
      canvas.style.top = imageRef.offsetTop + "px";
      detectedObjects.forEach((object) => {
        drawBoxes(object.bbox);
      });
      setFoodLabels(
        detectedObjects.map((object) => {
          return { label: object.label, quantity: null };
        })
      );
    }
  };

  return (
    <Box m={1} display="flex" flexDirection="column" justifyContent="center">
      <Box p={1} display="flex" id="image_container" justifyContent="center">
        <img
          id="image"
          src={src}
          className={classes.responsiveImage}
          alt="upload image for detecting"
        />
      </Box>
      <Tooltip title="Upload food image">
        <IconButton
          color="primary"
          aria-label="upload food image"
          component="span"
          onClick={handleClickOpen}
        >
          <PhotoCameraIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <form>
          <DialogContent>
            <input
              id="food-image-upload-button"
              accept="image/*"
              type="file"
              onChange={(event) => {
                setFile(event.target.files[0]);
                setData({ ...data, filename: event.target.files[0].name });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleUpload}
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress /> : "Upload"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default FoodDetector;
