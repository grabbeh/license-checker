import React from 'react'
// import Spinner from 'react-svg-spinner'
// import ContentLoader from 'react-content-loader'
import {
  Spinner,
  FlexContainer,
  FlexRow,
  FlexCol
} from '@zopauk/react-components'

/*
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
) */

const Loading = () => (
  <FlexContainer>
    <FlexRow style={{ height: '100vh' }} justify='center'>
      <FlexCol align='center' m='auto'>
        <Spinner size='75px' />
      </FlexCol>
    </FlexRow>
  </FlexContainer>
)

export default Loading
