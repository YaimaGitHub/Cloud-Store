import React from 'react';
import {
  HStack, Slider, SliderFilledTrack, SliderTrack,
} from '@chakra-ui/react';

/* type Props = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
} */

function CheckoutStep({ value }) {
  return (
    <HStack my={20} display={['none', 'flex', 'flex', 'flex']}>
      <Slider aria-label="slider" isDisabled value={value}>
        <SliderTrack>
          <SliderFilledTrack bg="green" />
        </SliderTrack>
      </Slider>
    </HStack>
  );
}
export default CheckoutStep;
