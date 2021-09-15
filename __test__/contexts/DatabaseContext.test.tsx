import { FunctionComponent } from "react";
import { render, screen } from "@testing-library/react";
import { DriveProvider, useDatabase, withDatabase } from "@contexts/DatabaseContext";
import databaseService, { documentNames } from "@services/databaseService";

const faker = require("faker");

jest.mock("@configs/firebaseClient", () => ({
  db: jest.fn()
}));

jest.mock("@services/authClientService", () => ({
    authStateChanged: jest.fn().mockImplementation(callback => callback(null)),
    idTokenChanged: jest.fn()
  })
);

jest.mock("@services/databaseService", () => ({
  ...jest.requireActual("@services/databaseService"),
  addDoc: jest.fn(),
  getDocById: jest.fn(),
  getAllDocs: jest.fn(),
  queryDocs: jest.fn(),
  querySnapshotDocs: jest.fn(),
  updateDoc: jest.fn()
}));

describe("DatabaseContext", () => {
  it("Expect call add document", async () => {
    expect.assertions(1);

    const addDocFn = jest.spyOn(databaseService, "addDoc").mockImplementation(jest.fn());

    const TestingComponent: FunctionComponent = () => {
      const { addDoc } = useDatabase() ?? { addDoc: null };

      if (addDoc) {
        addDoc(documentNames.FILES, {});
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<DriveProvider><TestingComponent /></DriveProvider>);

    expect(addDocFn).toBeCalledWith(documentNames.FILES, {});
  });

  it("Expect call find by id  document", async () => {
    expect.assertions(1);

    const uuid = faker.datatype.uuid();

    const getDocByIdFn = jest.spyOn(databaseService, "getDocById").mockImplementation(jest.fn());

    const TestingComponent: FunctionComponent = () => {
      const { getDocById } = useDatabase() ?? { getDocById: null };

      if (getDocById) {
        getDocById(documentNames.FILES, uuid);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<DriveProvider><TestingComponent /></DriveProvider>);

    expect(getDocByIdFn).toBeCalledWith(documentNames.FILES, uuid);
  });

  it("Expect call get all documents", async () => {
    expect.assertions(1);

    const getAllDocsFn = jest.spyOn(databaseService, "getAllDocs").mockImplementation(jest.fn());

    const TestingComponent: FunctionComponent = () => {
      const { getAllDocs } = useDatabase() ?? { getAllDocs: null };

      if (getAllDocs) {
        getAllDocs(documentNames.FILES);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<DriveProvider><TestingComponent /></DriveProvider>);

    expect(getAllDocsFn).toBeCalledWith(documentNames.FILES);
  });

  it("Expect call query documents", async () => {
    expect.assertions(1);

    const queryDocsFn = jest.spyOn(databaseService, "queryDocs").mockImplementation(jest.fn());

    const TestingComponent: FunctionComponent = () => {
      const { queryDocs } = useDatabase() ?? { queryDocs: null };

      if (queryDocs) {
        queryDocs(documentNames.FILES, []);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<DriveProvider><TestingComponent /></DriveProvider>);

    expect(queryDocsFn).toBeCalledWith(documentNames.FILES, []);
  });

  it("Expect call snapshot documents", async () => {
    expect.assertions(1);

    const callback = jest.fn();
    const querySnapshotDocsFn = jest.spyOn(databaseService, "querySnapshotDocs").mockImplementation(jest.fn());

    const TestingComponent: FunctionComponent = () => {
      const { querySnapshotDocs } = useDatabase() ?? { querySnapshotDocs: null };

      if (querySnapshotDocs) {
        querySnapshotDocs(documentNames.FILES, [], callback);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<DriveProvider><TestingComponent /></DriveProvider>);

    expect(querySnapshotDocsFn).toBeCalledWith(documentNames.FILES, [], callback);
  });

  it("Expect call update document", async () => {
    expect.assertions(1);

    const documentReference = {};
    const data = {};
    const updateDocFn = jest.spyOn(databaseService, "updateDoc").mockImplementation(jest.fn());

    const TestingComponent: FunctionComponent = () => {
      const { updateDoc } = useDatabase() ?? { updateDoc: null };

      if (updateDoc) {
        updateDoc(documentReference, data);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<DriveProvider><TestingComponent /></DriveProvider>);

    expect(updateDocFn).toBeCalledWith(documentReference, data);
  });

  it("Expect withDatabase to render correctly", async () => {
    expect.assertions(1);

    const lorem = faker.lorem.sentences();

    const WrapperComponent: FunctionComponent = ({ children }) => {
      return <>
        {children}
      </>;
    };

    const TestingComponent: FunctionComponent = () => {
      return <div data-testid="is-profile-output">{lorem}</div>;
    };

    const WithDatabase = withDatabase(TestingComponent);

    render(<WrapperComponent><WithDatabase /></WrapperComponent>);

    const isUserOutput = screen.getByTestId("is-profile-output");

    expect(isUserOutput).toBeInTheDocument();
  });
});