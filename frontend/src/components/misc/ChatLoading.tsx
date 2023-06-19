import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

type Props = {}

function ChatLoading({}: Props) {
  const skeletonHeight = '40px'

  return (
    <Stack>
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
      <Skeleton height={skeletonHeight} />
    </Stack>
  )
}

export default ChatLoading
