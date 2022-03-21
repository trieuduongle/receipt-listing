import { Skeleton } from 'antd';
import { SkeletonElementProps } from 'antd/lib/skeleton/Element';
import styled from 'styled-components';

const StyledSkeleton = styled(({ className }: SkeletonElementProps) => (
  <Skeleton.Input className={className} active block />
))`
  &:not(:first-child) {
    margin-top: 0.5rem;
  }
  margin-bottom: 0.5rem;
  height: 64px;

  > span.ant-skeleton-input {
    margin: 0;
    height: 100%;
  }
`;

export const ListReceiptsSkeleton = () => {
  return (
    <>
      <StyledSkeleton />
      <StyledSkeleton />
      <StyledSkeleton />
    </>
  );
};
