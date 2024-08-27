## Generate config for headless

Add script which use shopify admin graphql api  @Shopify Admin API @Codebase 
- it will create headless_config metaobject definition 
- this object contain url for field for logo
- this object contain text field for shop_name
- logo should be taken from the scripts/data directory and uploaded to the shopify 
- create entry of headless_config metaobject with preloaded logo and shop name

- don't use dependencies from src directory, or 3d party packages