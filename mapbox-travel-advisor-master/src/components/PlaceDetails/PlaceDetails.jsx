import React from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Chip,
    CardActions,
    Button,
} from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import Rating from "@mui/material/Rating";

import useStyles from "./styles";
import { collection, addDoc,getFirestore } from "firebase/firestore";
import { useNavigate } from 'react-router';
const db=getFirestore();

const PlaceDetails = ({ place, selected, refProp,email,password}) => {
    const classes = useStyles();
    let navigate = useNavigate();
    function handleClick() {
        navigate("/wishlist",{state:{email:email,password:password}});
      }
   
    async function wishlist(name,rating,email,password){
            var ref = collection(db, "Wishlist");
            const docRef = await addDoc(
            ref, {
            Name:name,
            Rating:rating,
            Email:email,
            Password:password,
            
            }
          )
          .then(()=> {alert("data added successfully");
       
            handleClick();
          })
          .catch((error)=>{
            alert("unsuccessful operation,error:"+error);
          });
          }
          

        
    if (selected) {
        refProp?.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
    
    return (
        <Card elevation={6}>
            <CardMedia
                style={{ height: 350 }}
                image={
                    place.photo
                        ? place.photo.images.large.url
                        : "https://jooinn.com/images/blur-restaurant-1.png"
                }
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {place.name}
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <Rating
                        name="read-only"
                        value={Number(place.rating)}
                        readOnly
                    />
                    <Typography gutterBottom variant="subtitle1">
                        out of {place.num_reviews} reviews
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {place.price_level}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">
                        {place.ranking}
                    </Typography>
                </Box>
                {place?.awards?.map((award) => (
                    <Box my={1} display="flex" justifyContent="space-between">
                        <img
                            src={award.images.small}
                            alt={award.display_name}
                        />
                        <Typography variant="subtitle2" color="textSecondary">
                            {award.display_name}
                        </Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({ name }) => (
                    <Chip
                        key={name}
                        size="small"
                        label={name}
                        className={classes.chip}
                    />
                ))}
                {place?.address && (
                    <Typography
                        gutterBottom
                        variant="subtitle2"
                        color="textSecondary"
                        className={classes.subtitle}
                    >
                        <LocationOnOutlinedIcon /> {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography
                        gutterBottom
                        variant="subtitle2"
                        color="textSecondary"
                        className={classes.spacing}
                    >
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => window.open(place.web_url, "_blank")}
                    >
                        Trip Advisor
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => window.open(place.website, "_blank")}
                    >
                        Website
                    </Button>
                   
                    <Button
                        size="small"
                        color="primary"
                        onClick={()=>wishlist(place.name,place.rating,email,password)}
                    >
                        Wishlist
                    </Button>                    
                </CardActions>
            </CardContent>
        </Card>
    );
              
};
export default PlaceDetails;
