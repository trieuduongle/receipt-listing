import { BreadcrumbProps, PageHeader as AntdPageHeader } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledAntdPageHeader = styled(AntdPageHeader)`
  background: #fff;
`;

interface PageHeaderProps {
  title?: React.ReactNode;

  routes?: BreadcrumbProps['routes'];
  extraActions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  routes,
  extraActions,
}) => {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbProps>();

  useEffect(() => {
    setBreadcrumb({
      routes,
      itemRender: (route) =>
        route.path ? (
          <Link to={route.path}>{route.breadcrumbName}</Link>
        ) : (
          route.breadcrumbName
        ),
    });
  }, [routes]);

  return (
    <StyledAntdPageHeader
      title={title}
      breadcrumb={breadcrumb}
      extra={extraActions}
    />
  );
};
