import { BreadcrumbProps, Spin } from 'antd';
import {
  useCreateReceiptMutation,
  useGeneratePresignUrlMutation,
  useUploadMediaMutation,
} from '~/api-slices';
import { PageContent, PageHeader } from '~/components';
import { getExtension } from '~/utils';
import { ReceiptFormModel } from './models';
import { ReceiptForm } from './ReceiptForm';

const breadcrumb: BreadcrumbProps['routes'] = [
  {
    path: '/home',
    breadcrumbName: 'Home',
  },
  {
    path: '',
    breadcrumbName: 'Upload Receipt',
  },
];

export const UploadReceipt = () => {
  const [generatePresignUrl, { isLoading: isGeneratePresignUrlLoading }] =
    useGeneratePresignUrlMutation();
  const [uploadMedia, { isLoading: isUploadMediaLoading }] =
    useUploadMediaMutation();
  const [createReceipt, { isLoading: isCreateReceiptLoading }] =
    useCreateReceiptMutation();
  const isLoading =
    isGeneratePresignUrlLoading ||
    isUploadMediaLoading ||
    isCreateReceiptLoading;
  const handleSubmit = async (model: ReceiptFormModel) => {
    // TODO: supo
    const presignUrlRes = await generatePresignUrl({
      extension: getExtension(model.file.name),
    });
    if ('data' in presignUrlRes) {
      const { data: presignUrlData } = presignUrlRes;

      const uploadMediaRes = await uploadMedia({
        url: presignUrlData.presignUrl,
        file: model.file,
      });

      if ('data' in uploadMediaRes) {
        const res = await createReceipt({
          title: model.title,
          description: model.description,
          medias: [
            {
              fileName: model.file.name,
              keyName: presignUrlData.keyName,
            },
          ],
        });

        console.log(res);
      }
    }
    console.log(model);
  };

  return (
    <>
      <PageHeader title="Upload Receipt" routes={breadcrumb}></PageHeader>

      <PageContent>
        <Spin spinning={isLoading}>
          <ReceiptForm submit={handleSubmit} />
        </Spin>
      </PageContent>
    </>
  );
};
