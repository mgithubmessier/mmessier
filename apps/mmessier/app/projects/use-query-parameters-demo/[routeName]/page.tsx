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
  const staticParams = [];
  if (DEMO_FORMS.length) {
    for (let i = 0; i < DEMO_FORMS.length; i++) {
      staticParams.push({ routeName: DEMO_FORMS[i] });
    }
    // return DEMO_FORMS.map((form) => ({
    //   routeName: form,
    // }));
  }
  return staticParams;
};

export default UseQueryParameterDemoRoute;
