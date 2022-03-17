import { joiResolver } from '@hookform/resolvers/joi';
import { Button, Form, FormProps, Input } from 'antd';
import Joi from 'joi';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { getErrorMessage } from '~/utils';
import { ImageTaker } from '../ImageTaker';
import { ReceiptFormModel } from '../models';

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

export const ReceiptForm: React.FC<ReceiptFormProps> = ({ submit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ReceiptFormModel>({
    resolver: joiResolver(schema),
  });

  console.log(errors);

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
            <ImageTaker
              value={field.value}
              title={field.value ? 'Re-take your receipt' : 'Scan your receipt'}
              onImageChanged={(file) => field.onChange(file)}
            />
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
          render={({ field }) => <Input onChange={field.onChange} />}
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
          render={({ field }) => <Input onChange={field.onChange} />}
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
