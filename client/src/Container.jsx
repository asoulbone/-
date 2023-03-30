import React from 'react'
import './container.css'
import InputImage from './InputImage'
import OutImage from './OutImage'

const Container = () => {
  return (
    <div className='Container'>
        <div className='canvas'>
            <InputImage/>
        </div>
        <div className='canvas'>
            <OutImage/>
        </div>
    </div>
  )
}

export default Container