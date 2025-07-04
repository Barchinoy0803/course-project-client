import { memo, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useGetTemplatesQuery, useGetTop5PopularTemplatesQuery } from '../../service/api/template.api'
import { Box, Button, Chip, CircularProgress, Typography } from '@mui/material'
import Card from '../../components/Card'
import { TagForm, TemplateForm } from '../../types/form'
import { useTranslator } from '../../hooks/useTranslator'
import { NavLink } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux'
import { BiShowAlt, BiHide } from "react-icons/bi";
import SimpleTable from '../../components/SimpleTable'
import { useGetAllTagsQuery } from '../../service/api/tags.api'

const Home = () => {
  const { searchtext, searchResults } = useSelector((state: RootState) => state.templates)
  const { t } = useTranslator('dashboard')
  const { t: buttons } = useTranslator('buttons')
  const { t: home } = useTranslator('home')

  const [showAll, setShowAll] = useState<boolean>(false)
  const [templates, setTemplates] = useState<TemplateForm[]>([])

  const { data: allTemplates, isLoading } = useGetTemplatesQuery({ searchtext })
  const { data: topRatingTemplates, isLoading: topLoading } = useGetTop5PopularTemplatesQuery({})
  const { data: tagData } = useGetAllTagsQuery({})

  useEffect(() => {
    if (!showAll) {
      setTemplates(allTemplates?.slice(0, 4))
    } else {
      setTemplates(allTemplates)
    }
  }, [allTemplates, showAll])

  return (
    <Box className='flex flex-col gap-6'>
      <Navbar />

      <Box className="container-home flex gap-2 my-3 overflow-x-auto whitespace-nowrap"
        sx={{
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none'
        }}>
        {tagData?.map((tag: TagForm, index: number) => (
          <Chip
            key={tag.id || index}
            sx={{
              backgroundColor: 'transparent',
              border: '1px solid #47aed6',
              color: '#47aed6',
              fontSize: '0.875rem',
              height: '32px',
              flexShrink: 0,
              '&:hover': {
                backgroundColor: '#47aed6',
                color: 'white',
              },
              transition: 'all 0.2s ease-in-out',
            }}
            label={tag.name}
          />
        ))}
      </Box>
      {
        !searchtext.length ? <>
          <Box className="flex justify-between container-home">
            <Typography fontFamily={'revert'} variant='h5'>{home('newForm')}</Typography>
            <Button startIcon={showAll ? <BiHide /> : <BiShowAlt />} variant='outlined' onClick={() => setShowAll(p => !p)}>{showAll ? buttons('hide') : buttons('showAll')}</Button>
          </Box>
          <div className='flex gap-5 container-home'>
            <Box className="grid grid-cols-5 gap-5 flex-wrap">
              <NavLink to={'/dashboard/templates'} className="flex flex-col gap-4">
                <div className="bg-white w-[200px] h-[200px]  flex items-center justify-center text-[75px] border border-gray-200 rounded-sm">
                  <button className="p-[200px] cursor-pointer">
                    <FaPlus className="text-[#47aed6]" />
                  </button>
                </div>
                <Typography>{t('blankTemplate')}</Typography>
              </NavLink>
              {
                isLoading ? <CircularProgress /> : templates?.map((template: TemplateForm) => (
                  <Card templateData={template} />
                ))
              }
            </Box>
          </div>
          <Box className="flex container-home">
            <Box className="flex flex-col gap-5 my-[80px]">
              <Typography fontFamily={'revert'} variant='h5'>{home('popularForms')}</Typography>
              <Box className="flex gap-5">
                {
                  topLoading ? <CircularProgress /> :
                    <SimpleTable data={topRatingTemplates} />
                }
              </Box>
            </Box>
          </Box>
        </> : <div className='flex items-center wrap gap-4'>{searchResults.map((item) => (<Card templateData={item} />))}</div>
      }
    </Box>
  )
}

export default memo(Home)
