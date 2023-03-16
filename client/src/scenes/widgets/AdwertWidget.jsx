import { Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import { WidgetWrapper } from '../../components/WidgetWrapper'
import React from 'react'

export const AdwertWidget = () => {
   const { palette } = useTheme()
   const dark = palette.neutral.dark
   const main = palette.neutral.main
   const medium = palette.neutral.medium

   return (
      <WidgetWrapper>
         <FlexBetween>
            <Typography color={dark} variant="h5" fontWeight="500">
               Sponsored
            </Typography>
            <Typography color={medium}>Create Ad</Typography>
         </FlexBetween>
         <img
            src="http://localhost:3001/assets/info4.jpeg"
            width="100%"
            height="auto"
            alt="advert"
         />
         <FlexBetween>
            <Typography color={main}>MikaCosmetics</Typography>
            <Typography color={medium}>MikaCosmetics.com</Typography>
         </FlexBetween>
         <Typography color={main} m="0.5rem 0">
            your pathway to stunning and immaculate beauty and made sure your
            skin is exfoliating skin and shining like light.
         </Typography>
      </WidgetWrapper>
   )
}
