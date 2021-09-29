import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    title: Yup.string().required("Please Enter Any Title"),
    desc: Yup.string().required("Please Enter Description"),
    url: Yup.string().required("Please Enter Valid URL"),
    loc: Yup.string().required("Please Enter Any Location"),
    email: Yup.string().required("Please Enter Any Email"),
    SDP: Yup.string().required("Select SDP Type"),
  }),
  mapPropsToValues: (props) => ({
    title: props.data ? props.data.eventTitle : "",
    desc: props.data ? props.data.eventDescription : "",
    url: props.data ? props.data.eventUrl : '',
    loc: props.data ? props.data.eventLocation.city : "",
    email: props.data ? props.data.eventContactEmail : "",

  }),
  handleSubmit: (values) => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;
