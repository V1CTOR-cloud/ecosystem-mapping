import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    title: Yup.string().required("Please Enter Any Title"),
    desc: Yup.string().required("Please Enter Description"),
  }),
  mapPropsToValues: (props) => ({
    title: props.data ? props.data.eventTitle : "",
    desc: props.data ? props.data.eventDescription : ""
  }),
  handleSubmit: (values) => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;