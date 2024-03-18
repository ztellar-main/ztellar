import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import styled from 'styled-components';


// function CloudinaryImg({imageUrl,width,height,heightMain,widthMain,marginLeft,marginRight,border,borderRadius,boxSizing,marginTop}) {
  function CloudinaryImg({imageUrl,width,height,heightMain,widthMain,marginLeft,marginRight,border,borderRadius,boxSizing,marginTop,maxWidth,objectFit}) {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dbagrkam0'
    }
  });

  const myImage = cld.image(`${imageUrl}`);

  myImage
  .resize(thumbnail().width(width).height(height))
  return (
    <AdvancedImage style={{
      marginTop:marginTop,
      height:heightMain,
      marginLeft:marginLeft,
      marginRight:marginRight,
      border:border,
      borderRadius:borderRadius,
      boxSizing:boxSizing,
      maxWidth:maxWidth,
      width:widthMain,
      objectFit:objectFit
    }} cldImg={myImage} /> 
  )
}

export default CloudinaryImg
