import { gql } from "@apollo/client";

export const GET_ALL_CONTACT = gql`
query getAllContact {
    contact{
      id,
      first_name,
      last_name
      phones {
        number
      }
      }
  }
`;

export const DELETE_CONTACT_BY_PK = gql`
mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
`;

export const ADD_CONTACT = gql`
  mutation AddContactWithPhones(
    $first_name: String!
    $last_name: String!
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name
        last_name: $last_name
        phones: { data: $phones }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

export const GET_CONTACT_BY_PK = gql`
query getContactByPK($id: Int!){
    contact_by_pk(id: $id){
      id,
      first_name,
      last_name,
      phones{
        number
      }
    }
  }
`;