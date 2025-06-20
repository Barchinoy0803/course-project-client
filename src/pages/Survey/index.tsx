import { memo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetOneTemplateQuery } from '../../service/api/template.api'
import {
  Button,
  CircularProgress,
  Typography,
  Container,
  Paper,
  Box,
  CardContent,
  CardMedia,
  Divider,
  Stack
} from '@mui/material'
import { useFieldArray, useForm } from 'react-hook-form'
import { Form, QuestionForm } from '../../types/form'
import { renderQuestion } from './helpers'
import { useCreateFormMutation } from '../../service/api/form.api'

const Survey = () => {
  const { id } = useParams()
  const { data: template, isLoading } = useGetOneTemplateQuery(id)
  const [createForm, { isLoading: createLoading }] = useCreateFormMutation()
  const { reset, control, handleSubmit } = useForm<Form>()
  const { fields } = useFieldArray({ control, name: 'Question' })

  useEffect(() => {
    if (template) {
      reset({
        ...template,
        Answer:
          template.Question?.map((q: QuestionForm, i: number) => ({
            sequence: i,
            answer: '',
            questionId: q.id,
            formId: template.templateId,
          })) || [],
      })
    }
  }, [template])

  const onSubmit = async (data: Form) => {
    const payload = {
      templateId: id,
      Answer: data.Answer
    }
    console.log(data);
    const res = await createForm(payload)
    console.log(res);

  }

  return (
    <Container maxWidth="lg" className="py-8 px-6 w-full max-w-6xl mx-auto">
      {!isLoading ? (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <Paper
            elevation={3}
            className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg"
          >
            {template.image && (
              <Box className="relative">
                <CardMedia
                  component="img"
                  height="300"
                  image={template.image}
                  alt={template.title}
                  className="object-contain w-full h-52"
                />
              </Box>
            )}
            <CardContent className="p-8">
              <Stack spacing={3} alignItems="center" className="space-y-6 items-center">
                <Typography
                  variant="h3"
                  component="h1"
                  className="text-4xl font-bold text-center text-blue-700 leading-tight"
                >
                  {template.title}
                </Typography>

                <Box className="flex justify-center">
                  <Typography
                    component="span"
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-purple-700 bg-purple-100 border border-purple-200"
                  >
                    {template.topic}
                  </Typography>
                </Box>

                <Typography
                  variant="h6"
                  component="p"
                  className="text-center text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
                >
                  {template.description}
                </Typography>
              </Stack>
            </CardContent>
          </Paper>

          <Stack spacing={3} className="space-y-6">
            {fields.map((question, index) => (
              <Paper
                key={question.id}
                elevation={1}
                className="p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 group w-full"
              >
                <Box className="flex items-start gap-4 mb-6 w-full">
                  <Box className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm group-hover:bg-blue-700 transition-colors duration-200">
                    {index + 1}
                  </Box>
                  <Box className="flex-1 min-w-0">
                    <Typography
                      variant="h6"
                      component="h3"
                      className="text-xl font-semibold text-gray-800 leading-relaxed"
                    >
                      {question.title}
                    </Typography>
                  </Box>
                </Box>
                <Divider className="mb-6 border-gray-200" />
                <Box className="w-full">
                  {renderQuestion({ question, control, index })}
                </Box>
              </Paper>
            ))}
          </Stack>

          <Box className="flex justify-center pt-6">
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            >
              Submit Survey
            </Button>
          </Box>
        </form>
      ) : (
        <Box className="flex flex-col items-center justify-center min-h-screen space-y-6">
          <CircularProgress size={64} thickness={4} className="text-blue-600" />
          <Stack spacing={1} alignItems="center" className="text-center space-y-2">
            <Typography
              variant="h5"
              component="p"
              className="text-gray-700 text-xl font-medium"
            >
              Loading survey...
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-500 text-sm"
            >
              Please wait while we fetch your data
            </Typography>
          </Stack>
        </Box>
      )}
    </Container>
  )
}

export default memo(Survey)