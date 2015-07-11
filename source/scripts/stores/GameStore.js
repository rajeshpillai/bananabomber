var World = function() {
    this.width = 19
    this.height = 11
    
    this.tiles = {}
    for(var x = 0; x < this.width; x++) {
        for(var y = 0; y < this.height; y++) {
            var color = "rgb(200, 175, 150)"
            var hasBody = false
            if(x % 2 == 0 && y % 2 == 0
            || x == 0 || x == this.width - 1
            || y == 0 || y == this.height - 1) {
                color = "rgb(80, 80, 80)"
                hasBody = true
            }
            this.tiles[x + "x" + y] = {
                "hasBody": hasBody,
                "color": color,
                "position": {
                    "x": x,
                    "y": y
                }
            }
        }
    }
}

World.prototype.getTile = function(position) {
    position.dx = position.dx || 0
    position.dy = position.dy || 0
    var x = Math.floor(position.x + position.dx)
    var y = Math.floor(position.y + position.dy)
    return this.tiles[x + "x" + y]
}

World.prototype.getTiles = function(position) {
    var tiles = []
    var dx = position.dx || 0
    var dy = position.dy || 0
    var x1 = Math.floor(Math.min(position.x1, position.x2) + dx)
    var x2 = Math.ceil(Math.max(position.x1, position.x2) + dx)
    var y1 = Math.floor(Math.min(position.y1, position.y2) + dy)
    var y2 = Math.ceil(Math.max(position.y1, position.y2) + dy)
    for(var x = x1; x < x2; x++) {
        for(var y = y1; y < y2; y++) {
            tiles.push(this.getTile({
                "x": x, "y": y
            }))
        }
    }
    return tiles
}

var Assets = {
    "images": {
        "red-monkey": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIGdlbmVyYXRlZCBhdCBkcnVidWJ1LmNvbSAgLS0+DQoNCjxzdmcNCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyINCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiDQogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiDQogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIg0KICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiDQogICB2ZXJzaW9uPSIxLjEiDQogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ig0KICAgeD0iMHB4Ig0KICAgeT0iMHB4Ig0KICAgd2lkdGg9IjM4Ig0KICAgaGVpZ2h0PSIzNiINCiAgIHZpZXdCb3g9IjAgMCAzOCAzNiINCiAgIGlkPSJzdmczMDc1Ig0KICAgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC40IHI5OTM5Ig0KICAgc29kaXBvZGk6ZG9jbmFtZT0icmVkLW1vbmtleS5zdmciPg0KICA8bWV0YWRhdGENCiAgICAgaWQ9Im1ldGFkYXRhMzE2MyI+DQogICAgPHJkZjpSREY+DQogICAgICA8Y2M6V29yaw0KICAgICAgICAgcmRmOmFib3V0PSIiPg0KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4NCiAgICAgICAgPGRjOnR5cGUNCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4NCiAgICAgIDwvY2M6V29yaz4NCiAgICA8L3JkZjpSREY+DQogIDwvbWV0YWRhdGE+DQogIDxkZWZzDQogICAgIGlkPSJkZWZzMzE2MSIgLz4NCiAgPHNvZGlwb2RpOm5hbWVkdmlldw0KICAgICBwYWdlY29sb3I9IiNmZmZmZmYiDQogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2Ig0KICAgICBib3JkZXJvcGFjaXR5PSIxIg0KICAgICBvYmplY3R0b2xlcmFuY2U9IjEwIg0KICAgICBncmlkdG9sZXJhbmNlPSIxMCINCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIg0KICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCINCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiINCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNjAwIg0KICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI4MzgiDQogICAgIGlkPSJuYW1lZHZpZXczMTU5Ig0KICAgICBzaG93Z3JpZD0iZmFsc2UiDQogICAgIGZpdC1tYXJnaW4tdG9wPSIwIg0KICAgICBmaXQtbWFyZ2luLWxlZnQ9IjAiDQogICAgIGZpdC1tYXJnaW4tcmlnaHQ9IjAiDQogICAgIGZpdC1tYXJnaW4tYm90dG9tPSIwIg0KICAgICBpbmtzY2FwZTp6b29tPSIxNy4xMzE1NzkiDQogICAgIGlua3NjYXBlOmN4PSIxOSINCiAgICAgaW5rc2NhcGU6Y3k9IjE5Ig0KICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTgiDQogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCINCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSINCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnMzA3NSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAxNSwwIGggNyB2IDEgaCAzIHYgMSBoIDIgdiAxIGggMSB2IDEgaCAxIHYgMSBoIDIgdiA0IGggMSB2IDUgaCAtMSB2IDMgaCAtMSB2IDEgaCAtMSB2IDEgaCAtMSB2IDEgaCAtMSB2IDEgaCAtMiB2IC00IGggMSB2IDIgaCAxIHYgLTMgaCAtMSB2IC0xIGggLTEgdiAtMSBoIC0yIHYgLTEgaCAtOCB2IDEgaCAtMiB2IDEgaCAtMSB2IDEgaCAtMSB2IDMgaCAxIHYgLTIgaCAxIHYgMSBoIDEgdiAzIGggMSB2IC00IGggMSB2IDUgaCA2IHYgMSBoIDEgdiAxIGggMSB2IDcgaCAtMSB2IDMgaCAtMSB2IDEgaCAtMSB2IDEgaCAtMiB2IC00IGggLTEgdiA0IGggLTIgdiAtMSBoIC0xIHYgLTEgaCAtMSB2IC00IGggLTEgdiAtNiBoIDEgdiAtMSBoIDEgViAyMiBIIDEzIFYgMjEgSCAxMSBWIDIwIEggMTAgViAxOSBIIDkgViAxOCBIIDggViAxNyBIIDcgViAxNSBIIDYgViA5IEggNyBWIDUgSCA5IFYgNCBoIDEgViAzIGggMSBWIDIgaCAyIFYgMSBoIDIgeiINCiAgICAgaWQ9InBhdGgzMDc5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE0LDIgaCAxIHYgMSBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzA4MSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAxNywyIGggMiB2IDEgaCAxIFYgNSBIIDE5IFYgNiBIIDE3IFYgNSBIIDE2IFYgMyBoIDEgeiINCiAgICAgaWQ9InBhdGgzMDgzIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJNIDMsNCBIIDcgViA1IEggMyB6Ig0KICAgICBpZD0icGF0aDMwODUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZDFjMjQiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTIsNCBoIDIgdiAyIGggLTIgeiINCiAgICAgaWQ9InBhdGgzMDg3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDMxLDQgaCA0IHYgMSBoIC00IHoiDQogICAgIGlkPSJwYXRoMzA4OSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCiAgPHBhdGgNCiAgICAgZD0iTSAyLDUgSCAzIFYgNiBIIDIgeiINCiAgICAgaWQ9InBhdGgzMDkxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJNIDMsNSBIIDcgViA5IEggNiB2IDYgaCAxIHYgMiBIIDQgViAxNiBIIDIgViAxNCBIIDEgViA4IEggMiBWIDYgaCAxIHoiDQogICAgIGlkPSJwYXRoMzA5MyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzMSw1IGggNCB2IDEgaCAxIHYgMiBoIDEgdiA2IGggLTEgdiAyIGggLTIgdiAxIGggLTMgdiAtMyBoIDEgViA5IGggLTEgeiINCiAgICAgaWQ9InBhdGgzMDk1Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDM1LDUgaCAxIHYgMSBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzA5NyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCiAgPHBhdGgNCiAgICAgZD0iTSAxLDYgSCAyIFYgOCBIIDEgeiINCiAgICAgaWQ9InBhdGgzMDk5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJNIDgsNiBIIDkgViA3IEggOCB6Ig0KICAgICBpZD0icGF0aDMxMDEiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZWVlZWUiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMzYsNiBoIDEgdiAyIGggLTEgeiINCiAgICAgaWQ9InBhdGgzMTAzIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDAsOCBoIDEgdiA2IEggMCB6Ig0KICAgICBpZD0icGF0aDMxMDUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZDFjMjQiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gOSw4IGggMiB2IDEgaCAxIHYgMyBoIC0xIHYgMSBIIDkgViAxMiBIIDggViA5IGggMSB6Ig0KICAgICBpZD0icGF0aDMxMDciDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZWVlZWUiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMzcsOCBoIDEgdiA2IGggLTEgeiINCiAgICAgaWQ9InBhdGgzMTA5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE1LDEzIGggOCB2IDEgaCAtMiB2IDEgaCAyIHYgLTEgaCAyIHYgMSBoIDEgdiAxIGggMSB2IDMgaCAtMSB2IC0yIGggLTEgdiAtMSBoIC0yIHYgMSBoIC0xIHYgNSBoIC02IHYgLTUgaCAtMSB2IC0xIGggLTIgdiAxIGggLTEgdiAyIGggLTEgdiAtMyBoIDEgdiAtMSBoIDEgdiAtMSBoIDIgdiAxIGggMiB2IC0xIGggLTIgeiINCiAgICAgaWQ9InBhdGgzMTExIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDEsMTQgaCAxIHYgMiBIIDEgeiINCiAgICAgaWQ9InBhdGgzMTE1Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE1LDE0IGggMiB2IDEgaCAtMiB6Ig0KICAgICBpZD0icGF0aDMxMTciDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZDFjMjQiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMjEsMTQgaCAyIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzExOSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNiwxNCBoIDEgdiAyIGggLTEgeiINCiAgICAgaWQ9InBhdGgzMTIxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDIsMTYgaCAyIHYgMSBIIDIgeiINCiAgICAgaWQ9InBhdGgzMTI1Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDEzLDE2IGggMiB2IDEgaCAtMiB6Ig0KICAgICBpZD0icGF0aDMxMjciDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZDFjMjQiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMjMsMTYgaCAyIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzEyOSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNCwxNiBoIDIgdiAxIGggLTIgeiINCiAgICAgaWQ9InBhdGgzMTMxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDQsMTcgaCAzIHYgMSBIIDQgeiINCiAgICAgaWQ9InBhdGgzMTMzIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDEzLDE3IGggMiB2IDQgaCAtMSB2IC0zIGggLTEgeiINCiAgICAgaWQ9InBhdGgzMTM1Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDIyLDE3IGggMSB2IDEgaCAxIHYgMyBoIDEgdiAxIGggLTMgeiINCiAgICAgaWQ9InBhdGgzMTM3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDIzLDE3IGggMiB2IDQgaCAtMSB2IC0zIGggLTEgeiINCiAgICAgaWQ9InBhdGgzMTM5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDMxLDE3IGggMyB2IDEgaCAtMyB6Ig0KICAgICBpZD0icGF0aDMxNDEiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZDFjMjQiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTgsMjAgaCAxIHYgMSBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzE0MyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAxNiwyMyBoIDUgdiAxIGggLTEgdiAyIGggLTMgdiAtMiBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzE0NSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAyOCwyNiBoIDMgdiAxIGggLTMgeiINCiAgICAgaWQ9InBhdGgzMTQ3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDI3LDI3IGggMSB2IDEgaCAxIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzE0OSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzMSwyNyBoIDEgdiAzIGggLTEgeiINCiAgICAgaWQ9InBhdGgzMTUxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWQxYzI0IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDMwLDMwIGggMSB2IDEgaCAtMSB6Ig0KICAgICBpZD0icGF0aDMxNTMiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZDFjMjQiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMjQsMzEgaCA2IHYgMSBoIC02IHoiDQogICAgIGlkPSJwYXRoMzE1NSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VkMWMyNCIgLz4NCjwvc3ZnPg0K",
        "blue-monkey": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIGdlbmVyYXRlZCBhdCBkcnVidWJ1LmNvbSAgLS0+DQoNCjxzdmcNCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyINCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiDQogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiDQogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIg0KICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIg0KICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiDQogICB2ZXJzaW9uPSIxLjEiDQogICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWluWU1pbiBtZWV0Ig0KICAgeD0iMHB4Ig0KICAgeT0iMHB4Ig0KICAgd2lkdGg9IjM4Ig0KICAgaGVpZ2h0PSIzNiINCiAgIHZpZXdCb3g9IjAgMCAzOCAzNiINCiAgIGlkPSJzdmczNzU3Ig0KICAgaW5rc2NhcGU6dmVyc2lvbj0iMC40OC40IHI5OTM5Ig0KICAgc29kaXBvZGk6ZG9jbmFtZT0iYmx1ZS1tb25rZXkuc3ZnIj4NCiAgPG1ldGFkYXRhDQogICAgIGlkPSJtZXRhZGF0YTM4NTEiPg0KICAgIDxyZGY6UkRGPg0KICAgICAgPGNjOldvcmsNCiAgICAgICAgIHJkZjphYm91dD0iIj4NCiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+DQogICAgICAgIDxkYzp0eXBlDQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+DQogICAgICA8L2NjOldvcms+DQogICAgPC9yZGY6UkRGPg0KICA8L21ldGFkYXRhPg0KICA8ZGVmcw0KICAgICBpZD0iZGVmczM4NDkiIC8+DQogIDxzb2RpcG9kaTpuYW1lZHZpZXcNCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIg0KICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiINCiAgICAgYm9yZGVyb3BhY2l0eT0iMSINCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMCINCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAiDQogICAgIGd1aWRldG9sZXJhbmNlPSIxMCINCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiDQogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiDQogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTYwMCINCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iODM4Ig0KICAgICBpZD0ibmFtZWR2aWV3Mzg0NyINCiAgICAgc2hvd2dyaWQ9ImZhbHNlIg0KICAgICBmaXQtbWFyZ2luLXRvcD0iMCINCiAgICAgZml0LW1hcmdpbi1sZWZ0PSIwIg0KICAgICBmaXQtbWFyZ2luLXJpZ2h0PSIwIg0KICAgICBmaXQtbWFyZ2luLWJvdHRvbT0iMCINCiAgICAgaW5rc2NhcGU6em9vbT0iMTcuNTY2MDIxIg0KICAgICBpbmtzY2FwZTpjeD0iMzguMjIwOTEiDQogICAgIGlua3NjYXBlOmN5PSIyMi4wMTM3NjciDQogICAgIGlua3NjYXBlOndpbmRvdy14PSItOCINCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04Ig0KICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIg0KICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmczNzU3IiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE1LDAgaCA3IHYgMSBoIDMgdiAxIGggMiB2IDEgaCAxIHYgMSBoIDEgdiAxIGggMiB2IDQgaCAxIHYgNSBoIC0xIHYgMyBoIC0xIHYgMSBoIC0xIHYgMSBoIC0xIHYgMSBoIC0xIHYgMSBoIC0yIHYgLTQgaCAxIHYgMiBoIDEgdiAtMyBoIC0xIHYgLTEgaCAtMSB2IC0xIGggLTIgdiAtMSBoIC04IHYgMSBoIC0yIHYgMSBoIC0xIHYgMSBoIC0xIHYgMyBoIDEgdiAtMiBoIDEgdiAxIGggMSB2IDMgaCAxIHYgLTQgaCAxIHYgNSBoIDYgdiAxIGggMSB2IDEgaCAxIHYgNyBoIC0xIHYgMyBoIC0xIHYgMSBoIC0xIHYgMSBoIC0yIHYgLTQgaCAtMSB2IDQgaCAtMiB2IC0xIGggLTEgdiAtMSBoIC0xIHYgLTQgaCAtMSB2IC02IGggMSB2IC0xIGggMSBWIDIyIEggMTMgViAyMSBIIDExIFYgMjAgSCAxMCBWIDE5IEggOSBWIDE4IEggOCBWIDE3IEggNyBWIDE1IEggNiBWIDkgSCA3IFYgNSBIIDkgViA0IGggMSBWIDMgaCAxIFYgMiBoIDIgViAxIGggMiB6Ig0KICAgICBpZD0icGF0aDM3NjEiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTksMSBoIDIgdiAxIGggMSBWIDYgSCAyMCBWIDUgaCAtMSB6Ig0KICAgICBpZD0icGF0aDM3NjMiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZWVlZWUiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTIsMyBoIDEgdiAxIGggMSBWIDggSCAxMiBWIDcgSCAxMSBWIDQgaCAxIHoiDQogICAgIGlkPSJwYXRoMzc2NSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0iTSAzLDQgSCA3IFYgNSBIIDMgeiINCiAgICAgaWQ9InBhdGgzNzY3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDMxLDQgaCA0IHYgMSBoIC00IHoiDQogICAgIGlkPSJwYXRoMzc2OSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCiAgPHBhdGgNCiAgICAgZD0iTSAyLDUgSCAzIFYgNiBIIDIgeiINCiAgICAgaWQ9InBhdGgzNzcxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJNIDMsNSBIIDcgViA5IEggNiB2IDYgaCAxIHYgMiBIIDQgViAxNiBIIDIgViAxNCBIIDEgViA4IEggMiBWIDYgaCAxIHoiDQogICAgIGlkPSJwYXRoMzc3MyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAxNSw1IGggMyBWIDYgSCAxNyBWIDggSCAxNiBWIDYgaCAtMSB6Ig0KICAgICBpZD0icGF0aDM3NzUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiNlZWVlZWUiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMzEsNSBoIDQgdiAxIGggMSB2IDIgaCAxIHYgNiBoIC0xIHYgMiBoIC0yIHYgMSBoIC0zIHYgLTMgaCAxIFYgOSBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzc3NyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNSw1IGggMSB2IDEgaCAtMSB6Ig0KICAgICBpZD0icGF0aDM3NzkiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Ik0gMSw2IEggMiBWIDggSCAxIHoiDQogICAgIGlkPSJwYXRoMzc4MSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAyNCw2IGggMiB2IDEgaCAxIHYgMyBoIC0xIHYgMSBIIDI0IFYgMTAgSCAyMyBWIDcgaCAxIHoiDQogICAgIGlkPSJwYXRoMzc4MyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNiw2IGggMSB2IDIgaCAtMSB6Ig0KICAgICBpZD0icGF0aDM3ODUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTksNyBoIDEgdiAxIGggLTEgeiINCiAgICAgaWQ9InBhdGgzNzg3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDAsOCBoIDEgdiA2IEggMCB6Ig0KICAgICBpZD0icGF0aDM3ODkiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTQsOCBoIDIgdiAxIGggLTIgeiINCiAgICAgaWQ9InBhdGgzNzkxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE3LDggaCAyIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzc5MyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNyw4IGggMSB2IDYgaCAtMSB6Ig0KICAgICBpZD0icGF0aDM3OTUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gOCw5IGggMiB2IDEgaCAxIHYgMyBoIC0xIHYgMSBIIDggViAxMyBIIDcgdiAtMyBoIDEgeiINCiAgICAgaWQ9InBhdGgzNzk3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE1LDEzIGggOCB2IDEgaCAtMiB2IDEgaCAyIHYgLTEgaCAyIHYgMSBoIDEgdiAxIGggMSB2IDMgaCAtMSB2IC0yIGggLTEgdiAtMSBoIC0yIHYgMSBoIC0xIHYgNSBoIC02IHYgLTUgaCAtMSB2IC0xIGggLTIgdiAxIGggLTEgdiAyIGggLTEgdiAtMyBoIDEgdiAtMSBoIDEgdiAtMSBoIDIgdiAxIGggMiB2IC0xIGggLTIgeiINCiAgICAgaWQ9InBhdGgzNzk5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDEsMTQgaCAxIHYgMiBIIDEgeiINCiAgICAgaWQ9InBhdGgzODAzIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDE1LDE0IGggMiB2IDEgaCAtMiB6Ig0KICAgICBpZD0icGF0aDM4MDUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMjEsMTQgaCAyIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzgwNyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNiwxNCBoIDEgdiAyIGggLTEgeiINCiAgICAgaWQ9InBhdGgzODA5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDIsMTYgaCAyIHYgMSBIIDIgeiINCiAgICAgaWQ9InBhdGgzODEzIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDEzLDE2IGggMiB2IDEgaCAtMiB6Ig0KICAgICBpZD0icGF0aDM4MTUiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMjMsMTYgaCAyIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzgxNyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzNCwxNiBoIDIgdiAxIGggLTIgeiINCiAgICAgaWQ9InBhdGgzODE5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDQsMTcgaCAzIHYgMSBIIDQgeiINCiAgICAgaWQ9InBhdGgzODIxIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDEzLDE3IGggMiB2IDQgaCAtMSB2IC0zIGggLTEgeiINCiAgICAgaWQ9InBhdGgzODIzIg0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDIyLDE3IGggMSB2IDEgaCAxIHYgMyBoIDEgdiAxIGggLTMgeiINCiAgICAgaWQ9InBhdGgzODI1Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDIzLDE3IGggMiB2IDQgaCAtMSB2IC0zIGggLTEgeiINCiAgICAgaWQ9InBhdGgzODI3Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojZWVlZWVlIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDMxLDE3IGggMyB2IDEgaCAtMyB6Ig0KICAgICBpZD0icGF0aDM4MjkiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMTgsMjAgaCAxIHYgMSBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzgzMSINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAxNiwyMyBoIDUgdiAxIGggLTEgdiAyIGggLTMgdiAtMiBoIC0xIHoiDQogICAgIGlkPSJwYXRoMzgzMyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6I2VlZWVlZSIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAyOCwyNiBoIDMgdiAxIGggLTMgeiINCiAgICAgaWQ9InBhdGgzODM1Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDI3LDI3IGggMSB2IDEgaCAxIHYgMSBoIC0yIHoiDQogICAgIGlkPSJwYXRoMzgzNyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCiAgPHBhdGgNCiAgICAgZD0ibSAzMSwyNyBoIDEgdiAzIGggLTEgeiINCiAgICAgaWQ9InBhdGgzODM5Ig0KICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIg0KICAgICBzdHlsZT0iZmlsbDojM2Y0OGNjIiAvPg0KICA8cGF0aA0KICAgICBkPSJtIDMwLDMwIGggMSB2IDEgaCAtMSB6Ig0KICAgICBpZD0icGF0aDM4NDEiDQogICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiDQogICAgIHN0eWxlPSJmaWxsOiMzZjQ4Y2MiIC8+DQogIDxwYXRoDQogICAgIGQ9Im0gMjQsMzEgaCA2IHYgMSBoIC02IHoiDQogICAgIGlkPSJwYXRoMzg0MyINCiAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCINCiAgICAgc3R5bGU9ImZpbGw6IzNmNDhjYyIgLz4NCjwvc3ZnPg0K",
        "green-monkey": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAB1ElEQVRYR9WX0U0EMQxE91qhBn7pAIkOKI4OkOiAX2qgFZBPMpobxrHjrFDYr7tsYr/Yzjh7OTZ9LptyHUtgd6+PX9HGPp/elmy3Fo+AFGgHcgpsFoghZwDLYKtQDlmFuwFj526kA/Xx8HLcvz/fBM3HIrsI/QNmzm0hPmbYJjOYcorr/D3Oi8aUPxu7gikoG1dgyoGC8jHfLEYPbXAdus8UzBaqnatx30xVGzlDGIxrmtQEdqJ27nAOwjWVAY78hmCzTjKI6H0UtRQsK/QZoOikqjpLwWYcc93xoVApb0ds5OwM6DYYLlSCOYKr1GkIFumY0p1Im5Qw44mNbA3lIhNYjkh0xLO0quilYA4X6RIrtTvJIHke/rffqky8X/66XWBf5D6pAEciiaLMAs22+dZRuvY4bNSUVRpVdHyscvUpgWGq8QBwOhCQwfxdBcrmlsEYLkurAqtCTYP5rrEOKxeAGSD3MRUxrqXtvpIieeFe2InUUsTUVVs1aBvrwrVS+W/ARu2II8YCHq09JWJVMINCUP6Pdv4cDOtuGzAlN9HhaEVMtagonZHjUbTayl8FU1/x1Z55WsQURFfDTo3YNmCczuziN5IU9a6dSr5pINhKCt3uN+ATwuqrOq0PAAAAAElFTkSuQmCC",
        "purple-monkey": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAB0ElEQVRYR+WX/U3DQAzFkxWyFTACdDpgBGCrrFBkJEfuq58/LkWK2vzV3F18v3v22e48HfSZD8o17QJ7f/o4s4Odft522R76WIFePp+nr9fvKzYcH4FsgQkQbirv+FhYnZexDmAZzKokIJ5SCGihdK4KdwGGMaNG1nU9eyowQKsiHkDmlmX525ftJ3MbmLrJnlqMsk08F0YulTm0hTasuzfyKFY8AwqRxZi3TlVk34qnSmB4Wt0si7MMOgTzXMg2rrgvSthevHnrZd3MwCI1RgCZPabaEFgUX3h5spL3L2DZppX5xwLLYi27tdFtp+miEvwsH+F4N/Bbeawa8CyuWBfiVYsNzNatrM7Z+lh1pVfMvRIlY1qfr7oLW1hlkX3XlsduxOBsndXfVjW0jV1Hqe3xGkOEZAXcrlOwSutTAvNalC6YglegLtqeSjLsuNXezI5SylFWzIIjICvEXZWsnSEwNXC4f0ksvWC7VI0nT/EhxVCpKPeNwt03WHSjUTFM4OzbmyhWBRMoC4rvu29ldBsREkFsPTwMGELfHMwrUcyd7FZGUO2SxLJ/BMXcnqWRoeD3FMM2xsZSpQ7jmvsDQ9Wyxq+r2rBiWMgtWBY/Fchf3SOlkDdDCJ4AAAAASUVORK5CYIIA",
    }
}

var Monkey = function(protomonkey) {
    for(var key in protomonkey) {
        this[key] = protomonkey[key]
    }
    
    this.velocity = {
        "x": 0,
        "y": 0,
        "min": 0.05,
        "max": 0.75
    }
    this.girth = 4 / 38
    this.friction = 0.005
}

Monkey.prototype.getStyle = function() {
    return {
        "width": 1 + "em",
        "height": 1 + "em",
        "position": "absolute",
        "top": this.position.y - (3 / 4) + "em",
        "left": this.position.x - (1 / 2) + "em",
        "backgroundSize": "99% 99%",
        "backgroundPosition": "50% 50%",
        "backgroundRepeat": "no-repeat",
        "backgroundImage": "url(" + this.image + ")",
    }
}

Monkey.prototype.update = function(tick) {
    // keyboard input
    if(Game.input.isDown(this.input["move north"])) {
        this.velocity.y -= this.acceleration * tick
    } if(Game.input.isDown(this.input["move south"])) {
        this.velocity.y += this.acceleration * tick
    } if(Game.input.isDown(this.input["move west"])) {
        this.velocity.x -= this.acceleration * tick
    } if(Game.input.isDown(this.input["move east"])) {
        this.velocity.x += this.acceleration * tick
    }
    
    // maximum velocity
    if(this.velocity.y < -this.velocity.max) {
        this.velocity.y = -this.velocity.max
    } if(this.velocity.y > +this.velocity.max) {
        this.velocity.y = +this.velocity.max
    } if(this.velocity.x < -this.velocity.max) {
        this.velocity.x = -this.velocity.max
    } if(this.velocity.x > +this.velocity.max) {
        this.velocity.x = +this.velocity.max
    }
    
    // collision with world
    var tiles = this.store.data.world.getTiles({
        "x1": this.position.x - this.girth,
        "y1": this.position.y - this.girth,
        "x2": this.position.x + this.girth,
        "y2": this.position.y + this.girth,
        "dx": this.velocity.x
    })
    for(var index in tiles) {
        var tile = tiles[index]
        if(tile.hasBody == true) {
            if(this.velocity.x > 0) {
                this.position.x = tile.position.x
                this.position.x -= this.girth + 0.01
                this.velocity.x = 0
            } else if(this.velocity.x < 0) {
                this.position.x = tile.position.x + 1
                this.position.x += this.girth + 0.01
                this.velocity.x = 0
            }
        }
    }
    var tiles = this.store.data.world.getTiles({
        "x1": this.position.x - this.girth,
        "y1": this.position.y - this.girth,
        "x2": this.position.x + this.girth,
        "y2": this.position.y + this.girth,
        "dy": this.velocity.y
    })
    for(var index in tiles) {
        var tile = tiles[index]
        if(tile.hasBody == true) {
            if(this.velocity.y > 0) {
                this.position.y = tile.position.y
                this.position.y -= this.girth + 0.01
                this.velocity.y = 0
            } else if(this.velocity.y < 0) {
                this.position.y = tile.position.y + 1
                this.position.y += this.girth + 0.01
                this.velocity.y = 0
            }
        }
    }
    
    // translation
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    
    // deceleration
    if(this.velocity.y < 0) {
        this.velocity.y *= Math.pow(this.friction, tick)
        if(this.velocity.y > this.velocity.min) {
            this.velocity.y = 0
        }
    } else if(this.velocity.y > 0) {
        this.velocity.y *= Math.pow(this.friction, tick)
        if(this.velocity.y < -this.velocity.min) {
            this.velocity.y = 0
        }
    } if(this.velocity.x < 0) {
        this.velocity.x *= Math.pow(this.friction, tick)
        if(this.velocity.x > this.velocity.min) {
            this.velocity.x = 0
        }
    } else if(this.velocity.x > 0) {
        this.velocity.x *= Math.pow(this.friction, tick)
        if(this.velocity.x < -this.velocity.min) {
            this.velocity.x = 0
        }
    }
}

var GameStore = Phlux.createStore({
    initiateStore: function() {
        this.data = {
            monkeys: {
                0: new Monkey({
                    "position": {
                        "x": 1.5,
                        "y": 1.5
                    },
                    "acceleration": 0.75,
                    "image": Assets.images["red-monkey"],
                    "input": {
                        "move north": "W",
                        "move south": "S",
                        "move west": "A",
                        "move east": "D"
                    },
                    "store": this
                }),
                1: new Monkey({
                    "position": {
                        "x": 11.5,
                        "y": 5.5
                    },
                    "acceleration": 5,
                    "image": Assets.images["blue-monkey"],
                    "input": {
                        "move north": "<up>",
                        "move south": "<down>",
                        "move west": "<left>",
                        "move east": "<right>"
                    },
                    "store": this
                })
            },
            world: new World()
        }
    },
    update: function(tick) {
        for(var key in this.data.monkeys) {
            this.data.monkeys[key].update(tick)
        }
        this.trigger()
    }
})

module.exports = GameStore
