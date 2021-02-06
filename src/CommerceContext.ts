import createSharedReactContext from 'create-shared-react-context';

// TODO add commerce.js type here
const CommerceContext = createSharedReactContext<any>({}, 'commerceContext');
export default CommerceContext;
