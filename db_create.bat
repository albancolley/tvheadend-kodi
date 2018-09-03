
SET CURRENT_DIR=%CD%

SET MONGODB_VERSION=3.6
SET MONGODB_PATH=C:\Program Files\MongoDB\Server\%MONGODB_VERSION%

SET CURRENT_DIR=%CD%

rem "%MONGODB_PATH%\bin\mongoimport" --jsonArray --db  tvheadend --collection entries %CD%/entries.json


"%MONGODB_PATH%\bin\mongoimport" --jsonArray --db  tvheadend --collection entries entries.json
