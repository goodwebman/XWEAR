import React, { useState } from 'react'

import Pagination from '../Pagination'

import usePagination from '../../hooks/usePaginationProps'
import BlogItem from './BlogItem'

interface Item {
  cat: string
  img: string
  desk: string
  title: string
  id: number
  
}

interface MyComponentProps {
  data: Item[]
  cat: string
  moreButton: string
  isBlog?: boolean
}

const Blog = ({ cat, data, moreButton, isBlog }: MyComponentProps) => {
  const [showPagination, setShowPagination] = useState(true)
  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    currentItems,
    showAll,
  } = usePagination<Item>({ data, isBlog })

  const handleShowAll = () => {
    showAll()
    setShowPagination((prev) => !prev)
  }

  return (
    <section className='px-[20px] max-w-[1362px] m-auto mt-[50px]'>
      <div className='flex justify-between items-center'>
        <h1 className='font-[900] text-[32px] uppercase leading-[42px] max-[500px]:text-[25px] text-[#121214]'>
          {cat}
        </h1>

        <button
          onClick={handleShowAll}
          className='flex gap-[8px] items-center cursor-pointer'
        >
          <h1 className='uppercase font-[900] text-[14px] text-black leading-[23px]'>
            {showPagination ? "Больше" : "Меньше"} <span className='max-[600px]:hidden'>{moreButton}</span>
          </h1>

          <div className='text-[24px]'>
            <svg
              width='6'
              height='11'
              viewBox='0 0 6 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M5.36529 6.06549C5.67771 5.75307 5.67771 5.24654 5.36529 4.93412L1.36529 0.934119C1.05288 0.6217 0.546343 0.6217 0.233924 0.934119C-0.0784959 1.24654 -0.0784959 1.75307 0.233924 2.06549L3.66824 5.4998L0.233924 8.93412C-0.0784955 9.24654 -0.0784955 9.75307 0.233924 10.0655C0.546343 10.3779 1.05288 10.3779 1.36529 10.0655L5.36529 6.06549Z'
                fill='#121214'
              />
            </svg>
          </div>
        </button>
      </div>

      <div className='relative flex flex-col items-center mt-[10px]'>
        <div className='grid grid-cols-3 max-[1050px]:grid-cols-2 max-[700px]:grid-cols-1 gap-[30px]  items-baseline'>
          {currentItems.map((blog) => (
            <BlogItem
				  key={blog.id}
				  id={blog.id}
				  img={blog.img} title={blog.title} desk={blog.desk}              
            />
          ))}
        </div>

        {showPagination && (
          <Pagination
            prevPage={prevPage}
            nextPage={nextPage}
            totalPages={totalPages}
            goToPage={goToPage}
            currentPage={currentPage}
			
          />
        )}
      </div>
    </section>
  )
}

export default Blog
