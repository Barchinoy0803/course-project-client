import { memo, useMemo, useState } from 'react'
import { useDeleteFormsMutation, useGetAllUserFormsQuery, useGetFormsQuery } from '../../service/api/form.api'
import { Alert, Button, CircularProgress, Tooltip } from '@mui/material'
import CustomTabs from '../../components/Tabs'
import { FormTableColumns, formTabNames } from '../../constants'
import { GridRowSelectionModel } from '@mui/x-data-grid'
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from 'react-icons/fa';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Card from '../../components/Card'
import { useTranslator } from '../../hooks/useTranslator'

const Form = () => {
  const { t } = useTranslator('forms')
  const { searchtext, searchResults } = useSelector((state: RootState) => state.templates)
  const navigate = useNavigate()
  const { data: alldata } = useGetAllUserFormsQuery({})
  const { data: formsData, isLoading } = useGetFormsQuery({})
  const [deleteForms, { isLoading: deleteLoading }] = useDeleteFormsMutation()
  const [activeTab, setActiveTab] = useState<string>("all")
  const [selectedIds, setSelectedIds] = useState<GridRowSelectionModel>()

  const ids = useMemo(() => {
    return selectedIds?.ids ? [...selectedIds.ids] : []
  }, [selectedIds])

  const isAllForms = useMemo(() => {
    return activeTab === "all"
  }, [activeTab])

  const handleDelete = async () => {
    await deleteForms({ ids: [...selectedIds?.ids!] })
    toast.success(t('deleteToast'))
  }

  const handleUpdate = async () => {
    navigate(`/dashboard/form/${ids[0]}`)
  }

  const handleShow = async () => {
    navigate(`/dashboard/form/${ids[0]}?readMode=true`)
  }

  return (
    <div className='container mx-auto flex flex-col gap-3 mt-[50px] mb-[30px]'>
      <Alert className='mb-5' variant="outlined" severity="info">
        {activeTab === 'all' ? t('allNote') : t('yourNote')}
      </Alert>
      <div className='flex items-center gap-5 mb-3'>
        {
          !isAllForms ? <>
            <Tooltip placement='top' title={t('deleteForms')}>
              <Button color='error' disabled={deleteLoading || isAllForms} onClick={handleDelete} startIcon={<FaRegTrashCan />} variant='outlined'>{t('delete')}</Button>
            </Tooltip>
            <Tooltip placement='top' title={t('updateForms')}>
              <Button disabled={deleteLoading || isAllForms} onClick={handleUpdate} startIcon={<FaEdit />} variant='outlined'>{t('update')}</Button>
            </Tooltip>
          </> :
            <Tooltip placement='top' title={t('showForms')}>
              <Button disabled={deleteLoading} onClick={handleShow} startIcon={<FaEye />} variant='outlined'>{t('show')}</Button>
            </Tooltip>
        }
      </div>
      {
        searchtext.length ? <div className='flex items-center gap-4'>{searchResults.map((item) => (<Card templateData={item} />))}</div> : isLoading ? <CircularProgress /> : <CustomTabs tabNames={formTabNames} setActiveTab={setActiveTab} activeTab={activeTab} allData={formsData} columns={FormTableColumns} selectedIds={selectedIds} setSelectedIds={setSelectedIds} data={alldata} />
      }
    </div>
  )
}

export default memo(Form)
