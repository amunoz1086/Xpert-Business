import React from 'react'

const SeccionPage = ({title,w}) => {
  return (
    <div className='flex items-center space-x-4 my-6'>
        <p className={`text-coomeva_color-rojo ${w} `}>{title}</p>
        <p className='w-full border-b border-coomeva_color-rojo opacity-60' />
    </div>
  )
}

export default SeccionPage