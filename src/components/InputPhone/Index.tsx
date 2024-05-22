import 'react-phone-input-2/lib/style.css';

import { Form } from 'antd';
import { FormItemProps } from 'antd/lib';
import PhoneInput from 'react-phone-input-2';
import tr from 'react-phone-input-2/lang/tr.json';

export default function Index({ ...props }: FormItemProps) {
  return (
    <Form.Item {...props}>
      <PhoneInput
        country="tr"
        localization={tr}
        enableSearch
        enableAreaCodeStretch
        countryCodeEditable={false}
        preferredCountries={['tr']}
        disableSearchIcon
        searchPlaceholder="Ara"
        containerClass="custom-phone-input"
        inputProps={{
          required: props.required
        }}
      />
    </Form.Item>
  );
}
