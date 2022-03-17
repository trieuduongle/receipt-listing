import { joiResolver } from '@hookform/resolvers/joi';
import { Button, Form, FormProps, Input } from 'antd';
import Joi from 'joi';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { SelectImage } from '~/components';
import { getErrorMessage } from '~/utils';
import { ReceiptFormModel } from '../models';
import { PreviewImage } from '../PreviewImage';

const schema = Joi.object<ReceiptFormModel>({
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Description is required',
  }),
  file: Joi.object().required().messages({
    'any.required': 'Receipt is required',
  }),
});

export interface ReceiptFormProps {
  submit: (model: ReceiptFormModel) => void;
}

const StyledForm = styled((props: FormProps) => <Form {...props} />)`
  width: 80vw;
  margin: 0 auto;

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  display: block;
  margin: 0 auto;
  @media (min-width: 576px) {
    max-width: 300px;
  }
`;

const StyledSelectImage = styled(SelectImage)`
  height: 64px;

  > button {
    min-height: 64px;
  }
`;

export const ReceiptForm: React.FC<ReceiptFormProps> = ({ submit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
  } = useForm<ReceiptFormModel>({
    resolver: joiResolver(schema),
    defaultValues: {
      description: new Date().toISOString().substring(0, 13),
    },
  });

  const uploadedImage = watch('file');

  useEffect(() => {
    if (uploadedImage) {
      setValue('title', uploadedImage.name);
      clearErrors('title');
    }
  }, [uploadedImage, setValue, clearErrors]);

  const onFinish = (fieldsValue: ReceiptFormModel) => {
    submit(fieldsValue);
  };

  return (
    <StyledForm layout="vertical" onFinish={handleSubmit(onFinish)}>
      <Form.Item
        required
        validateStatus={errors.file && 'error'}
        help={getErrorMessage(errors.file)}
      >
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <>
              <StyledSelectImage
                title={
                  field.value ? 'Re-take your receipt' : 'Scan your receipt'
                }
                hasBorder
                onImageChanged={(file) => field.onChange(file)}
              />
              <PreviewImage
                value={field.value}
                onRemove={() => field.onChange()}
              />
            </>
          )}
        />
      </Form.Item>

      <Form.Item
        required
        label="Title"
        validateStatus={errors.title && 'error'}
        help={getErrorMessage(errors.title)}
      >
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Input value={field.value} onChange={field.onChange} />
          )}
        />
      </Form.Item>
      <Form.Item
        required
        label="Description"
        validateStatus={errors.description && 'error'}
        help={getErrorMessage(errors.description)}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input value={field.value} onChange={field.onChange} />
          )}
        />
      </Form.Item>

      <Form.Item>
        <SubmitButton size="large" type="primary" htmlType="submit">
          Submit
        </SubmitButton>
      </Form.Item>
    </StyledForm>
  );
};
