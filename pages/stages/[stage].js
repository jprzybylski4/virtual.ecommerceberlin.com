
import React from 'react'
import {
    connect,
    WidgetStage,
    WidgetSchedule,
    reduxWrapper,
    configure
  } from 'eventjuicer-site-components';
  
  const settings = require('../../settings').default;
  import Schedule from '../../compositions/Schedule'

  const PageStage = ({stage}) => (

    <>
    <WidgetStage stage={stage} />
    <Schedule />
    </>
  )

  export async function getStaticPaths() {
  
    return {
      paths: [
        { params: { stage: "A"} },
        { params: { stage: "B"} }
      ],
      fallback: "blocking" 
    };
     
  }
  
export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
    
    const {params: {stage}} = props;

    await configure(props, {
      settings : settings,
      preload : ["presenters"]
    })

    return {
      props : {
        stage: stage
      },
      revalidate : 30
    }
  })
  
export default connect()(PageStage);