import styled from "@emotion/styled";
import * as Styles from "../../libs/common/styles";

export const AutoFormContainer = styled.div`
    .form-group {
        &.double-row {
            flex-wrap: wrap;
            .form-email {
                flex: 1 1 auto;
                width: auto;
                max-width: 100%;
            }
            .submit-container {
                flex: 0 0 auto;
                ${Styles.BreakpointsUtils.tabletAndDesktopOnly(`
                    margin-top: 20px;
                `)}
            }
            .recupera-preventivo-link-container-body {
                margin-top: 0;
            }
        }
        ${Styles.BreakpointsUtils.tabletOnly(`
            .us-form-control,
            .birthday {
              font-size: 14px;
            }
            .form-type {
              margin-bottom: 8px;
            }
            .form-plate {
              width: 35%;
            }
            .form-birthday {
              flex: 1;
            }
            &:not(.double-row) {
              flex-wrap: wrap;
            }
        `)}
    }
`;