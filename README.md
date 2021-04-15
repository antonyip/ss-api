# Pre-Reqs
node v.14.10
yarn

# Using this Repo
## Development
```
yarn && yarn start
```
## Upload to siasky
```
yarn build && yarn siasky
✔ What do you want to use as your public directory? … build
✔ Configure as a signle-page app (rewrite all urls to /index.html)? … yes
✔ Wanna deploy web pages to Skynet using handshake domains ? … no
```

# Public Deployed Site
https://siasky.net/AADQLQbPFD_kn144bRpLBeVu4ZArXn0BpOdN0J1q9pRsXg

# functions of skydb
- Version 4.0.0
SkynetClient
```
export declare class SkynetClient {
    customOptions: CustomClientOptions;
    protected initialPortalUrl: string;
    protected static resolvedPortalUrl?: Promise<string>;
    protected givenPortalUrl?: string;
    uploadFile: typeof uploadFile;
    protected uploadFileRequest: typeof uploadFileRequest;
    uploadDirectory: typeof uploadDirectory;
    protected uploadDirectoryRequest: typeof uploadDirectoryRequest;
    downloadFile: typeof downloadFile;
    downloadFileHns: typeof downloadFileHns;
    getSkylinkUrl: typeof getSkylinkUrl;
    getHnsUrl: typeof getHnsUrl;
    getHnsresUrl: typeof getHnsresUrl;
    getMetadata: typeof getMetadata;
    getFileContent: typeof getFileContent;
    getFileContentHns: typeof getFileContentHns;
    protected getFileContentRequest: typeof getFileContentRequest;
    openFile: typeof openFile;
    openFileHns: typeof openFileHns;
    resolveHns: typeof resolveHns;
    extractDomain: typeof extractDomain;
    getFullDomainUrl: typeof getFullDomainUrl;
    loadMySky: typeof loadMySky;
    file: {
        getJSON: (userID: string, path: string, opts?: import("./skydb").CustomGetJSONOptions | undefined) => Promise<import("./skydb").JSONResponse>;
    };
    db: {
        getJSON: (publicKey: string, dataKey: string, customOptions?: import("./skydb").CustomGetJSONOptions | undefined) => Promise<import("./skydb").JSONResponse>;
        setJSON: (privateKey: string, dataKey: string, json: import("./skydb").JsonData, customOptions?: import("./skydb").CustomSetJSONOptions | undefined) => Promise<import("./skydb").JSONResponse>;
    };
    registry: {
        getEntry: (publicKey: string, dataKey: string, customOptions?: import("./registry").CustomGetEntryOptions | undefined) => Promise<import("./registry").SignedRegistryEntry>;
        getEntryUrl: (publicKey: string, dataKey: string, customOptions?: import("./registry").CustomGetEntryOptions | undefined) => Promise<string>;
        setEntry: (privateKey: string, entry: import("./registry").RegistryEntry, customOptions?: import("./utils/skylink").BaseCustomOptions | undefined) => Promise<void>;
        postSignedEntry: (publicKey: string, entry: import("./registry").RegistryEntry, signature: Uint8Array, customOptions?: import("./utils/skylink").BaseCustomOptions | undefined) => Promise<void>;
    };
```

MySky
```
export declare class MySky {
    protected connector: Connector;
    protected hostDomain: string;
    static instance: MySky | null;
    dacs: DacLibrary[];
    grantedPermissions: Permission[];
    pendingPermissions: Permission[];
    constructor(connector: Connector, permissions: Permission[], hostDomain: string);
    static New(client: SkynetClient, skappDomain?: string, customOptions?: CustomConnectorOptions): Promise<MySky>;
    /**
     * Loads the given DACs.
     */
    loadDacs(...dacs: DacLibrary[]): Promise<void>;
    addPermissions(...permissions: Permission[]): Promise<void>;
    checkLogin(): Promise<boolean>;
    /**
     * Destroys the mysky connection by:
     *
     * 1. Destroying the connected DACs,
     *
     * 2. Closing the connection,
     *
     * 3. Closing the child iframe
     */
    destroy(): Promise<void>;
    logout(): Promise<void>;
    requestLoginAccess(): Promise<boolean>;
    userID(): Promise<string>;
    getJSON(path: string, opts?: CustomGetJSONOptions): Promise<JSONResponse>;
    setJSON(path: string, json: JsonData, opts?: CustomSetJSONOptions): Promise<JSONResponse>;
    protected catchError(errorMsg: string): Promise<void>;
    protected launchUI(): Promise<Window>;
    protected connectUi(childWindow: Window): Promise<Connection>;
    protected loadDac(dac: DacLibrary): Promise<void>;
    protected handleLogin(loggedIn: boolean): void;
    protected signRegistryEntry(entry: RegistryEntry, path: string): Promise<Signature>;
}
```

ContentRecordDAC
```
export declare class ContentRecordDAC extends DacLibrary implements IContentRecordDAC {
    constructor();
    getPermissions(): Permission[];
    recordNewContent(...data: IContentCreation[]): Promise<IDACResponse>;
    recordInteraction(...data: IContentInteraction[]): Promise<IDACResponse>;
}
```

# Original README
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
