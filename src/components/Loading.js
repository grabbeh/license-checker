import React, { Fragment } from 'react'
import Spinner from 'react-svg-spinner'
import Flex from './Flex'
import Box from './Box'

import ContentLoader from 'react-content-loader'

const Loading = () => (
  <Fragment>
    <ContentLoader width={600} height={80} preserveAspectRatio='xMinYMin slice'>
      <rect x='0' y='0' rx='5' ry='5' width='100' height='15' />
      <rect x='0' y='20' rx='5' ry='5' width='40' height='10' />
      <rect x='0' y='35' rx='5' ry='5' width='40' height='10' />
      <rect x='0' y='50' rx='5' ry='5' width='75' height='10' />
      <circle cx='120' cy='7' r='7' />
    </ContentLoader>
    <ContentLoader width={600} height={80}>
      <rect x='0' y='0' rx='5' ry='5' width='100' height='15' />
      <rect x='0' y='20' rx='5' ry='5' width='40' height='10' />
      <rect x='0' y='35' rx='5' ry='5' width='40' height='10' />
      <rect x='0' y='50' rx='5' ry='5' width='75' height='10' />
      <circle cx='120' cy='7' r='7' />
    </ContentLoader>
    <ContentLoader width={600} height={80}>
      <rect x='0' y='0' rx='5' ry='5' width='100' height='15' />
      <rect x='0' y='20' rx='5' ry='5' width='40' height='10' />
      <rect x='0' y='35' rx='5' ry='5' width='40' height='10' />
      <rect x='0' y='50' rx='5' ry='5' width='75' height='10' />
      <circle cx='120' cy='7' r='7' />
    </ContentLoader>
  </Fragment>
)

const LoadingBasic = () => (
  <Flex
    height='100%'
    alignItems='center'
    flexWrap='wrap'
    justifyContent='center'
  >
    <Spinner size='64px' speed='slow' thickness={3} color='#1da1f2' />
  </Flex>
)

export default Loading
