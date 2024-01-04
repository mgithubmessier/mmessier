import { DEMO_FORMS } from './constants';
import { UseQueryParameterDemoRouteClient } from './page.client';

type UseQueryParametersDemoRouteProps = {
  params: {
    routeName: string;
  };
};

const UseQueryParameterDemoRoute = ({
  params,
}: UseQueryParametersDemoRouteProps) => {
  return <UseQueryParameterDemoRouteClient formName={params.routeName} />;
};

export const generateStaticParams = () => {
  if (DEMO_FORMS.length) {
    return DEMO_FORMS.map((form) => ({
      routeName: form,
    }));
  }
  return [];
};

export default UseQueryParameterDemoRoute;
